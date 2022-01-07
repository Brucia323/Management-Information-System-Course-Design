import { Col, Table, Row, Space, Button, message, Menu, Layout, Modal, Input } from "antd"
import Search from "antd/lib/input/Search"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import Column from "antd/lib/table/Column"
import { useState, useEffect } from "react"
import booksService from '../services/books'

const Books = (props) => {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    useEffect(() => {
        setLoading(true)
        booksService
            .getBooks()
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setBooks(response)
                }
                setLoading(false)
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
                setLoading(false)
            })
    }, [])

    const [types, setTypes] = useState([])
    useEffect(() => {
        booksService
            .getTypes()
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setTypes(response)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
    }, [])

    const [filter, setFilter] = useState('')
    const [filterBooks, setFilterBooks] = useState([])
    useEffect(() => {
        setFilterBooks(books)
        setLoading(false)
    }, [books])

    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [bookId, setBookId] = useState('')

    const selectType = (key) => {
        setLoading(true)
        setFilter('')
        if (key === 0) {
            setFilterBooks(books)
        } else {
            let newBooks = []
            books.forEach(book => {
                if (book.bookTypeId === key) {
                    newBooks = newBooks.concat(book)
                }
            })
            setFilterBooks(newBooks)
        }
        setLoading(false)
    }

    const onChange = (event) => {
        setFilter(event.target.value)
    }

    const onSearch = () => {
        if (filter === '') {
            setFilterBooks(books)
        } else {
            let newBooks = []
            books.forEach(book => {
                if (book.bookName.indexOf(filter) !== -1) {
                    newBooks = newBooks.concat(book)
                }
            })
            setFilterBooks(newBooks)
        }
    }

    const reserve = (record) => {
        booksService.reserve(record.bookIsbn, props.userid).then(response => {
            if (Number(response) === -3) {
                message.error('预约失败')
            } else if (Number(response) === -1) {
                message.warning('请先归还超期图书')
            } else if (Number(response) === -2) {
                message.warning('您已经预约过这本书了')
            } else if (Number(response) === -4) {
                message.warning('请先缴交罚金')
            } else if (Number(response) === 0) {
                message.warning('可直接借阅')
            } else {
                message.success(`预约成功，您当前是第${Number(response)}位`)
            }
        }).catch(error => {
            message.error('服务器出现错误，请稍后再试')
            console.log(error);
        })
    }

    const showModal = () => {
        setVisible(true)
    }

    const changeBookId = (event) => {
        setBookId(event.target.value)
    }

    const borrow = () => {
        setConfirmLoading(true)
        if (bookId === '') {
            message.warning('请输入图书编号，编号位于图书封面标签')
            setConfirmLoading(false)
            return
        }
        booksService
            .borrow(bookId, props.userid)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('借阅成功')
                } else if (Number(response) === -1) {
                    message.warning('请先缴纳罚款')
                } else if (Number(response) === -2) {
                    message.warning('已达到借书上限')
                } else if (Number(response) === -3) {
                    message.warning('请先归还超期图书')
                } else if (Number(response) === -4) {
                    message.warning('图书已被预约')
                } else if (Number(response) === -5) {
                    message.error('没有借书资格')
                } else {
                    message.error('借书失败')
                }
                setConfirmLoading(false)
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
                setConfirmLoading(false)
            })
        setVisible(false)
        setConfirmLoading(false)
    }

    const onCancel = () => {
        setVisible(false)
    }

    return (
        <div>
            <Sider width={200} className="site-layout-background" style={{ float: 'left' }}>
                <Menu mode="inline" defaultSelectedKeys={['0']} style={{ hight: '100%', borderRight: 0 }}>
                    <Menu.Item key={0} onClick={() => { selectType(0) }}>全部</Menu.Item>
                    {
                        types.map(type => {
                            return (
                                <Menu.Item key={type.bookTypeId} onClick={() => { selectType(type.bookTypeId) }}>{type.bookType}</Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Row>
                    <Col offset={1}>
                        <Button onClick={showModal} style={{ margin: '16px auto' }}>图书借阅</Button>
                        <Modal title='图书借阅' visible={visible} onOk={borrow} onCancel={onCancel} confirmLoading={confirmLoading}>
                            图书编号<Input placeholder="请输入图书封面标签的图书编号" value={bookId} onChange={changeBookId} />
                        </Modal>
                    </Col>
                    <Col span={4} offset={17}>
                        <Search placeholder="输入关键字搜索书名" value={filter} onChange={onChange} onSearch={onSearch} style={{ margin: '16px auto' }} />
                    </Col>
                </Row>
                <Content className="site-layout-background" style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}>
                    <Table dataSource={filterBooks} loading={loading} pagination={{ defaultCurrent: 1, total: filterBooks.length }} rowKey={(record) => { return record.bookIsbn }}>
                        <Column title='图书名称' dataIndex='bookName' key='bookName' />
                        <Column title='图书作者' dataIndex='bookAuthor' key='bookAuthor' />
                        <Column title='ISBN' dataIndex='bookIsbn' key='bookIsbn' />
                        <Column title='价格' dataIndex='bookMoney' key='bookMoney' />
                        <Column title='出版时间' dataIndex='bookPublictime' key='bookPublictime' />
                        <Column title='出版社' dataIndex='bookPress' key='bookPress' />
                        <Column title='图书类别' dataIndex='bookType' key='bookType' />
                        <Column title='数量' dataIndex='count' key='count' />
                        <Column title='操作' key='action' render={(text, record) => (
                            <Space>
                                <Button onClick={() => { reserve(record) }}>预约</Button>
                            </Space>
                        )} />
                    </Table>
                </Content>
            </Layout>
        </div>
    )
}

export default Books