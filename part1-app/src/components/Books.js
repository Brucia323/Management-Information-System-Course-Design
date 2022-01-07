import { Col, Table, Row, Space, Button, message, Menu, Layout, Modal, Input, DatePicker, Select, InputNumber, Upload } from "antd"
import Search from "antd/lib/input/Search"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import Column from "antd/lib/table/Column"
import { useState, useEffect } from "react"
import booksService from '../services/books'
import bookService from '../services/book'
import moment from 'moment'
import { Option } from "antd/lib/mentions"
import { UploadOutlined } from '@ant-design/icons'

const Books = () => {
    const [rowKeys, setRowKeys] = useState()
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setRowKeys(selectedRowKeys)
        }
    }

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
                console.error(error)
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
                console.error(error)
            })
    }, [])

    const [filter, setFilter] = useState('')
    const [filterBooks, setFilterBooks] = useState([])
    useEffect(() => {
        setFilterBooks(books)
        setLoading(false)
    }, [books])

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [bookName, setBookName] = useState()
    const [bookAuthor, setBookAuthor] = useState()
    const [bookIsbn, setBookIsbn] = useState()
    const [oldIsbn, setOldIsbn] = useState()
    const [bookMoney, setBookMoney] = useState()
    const [bookPublicTime, setBookPublicTime] = useState()
    const [bookTypeId, setBookTypeId] = useState()
    const [bookPress, setBookPress] = useState()
    const [bookUp, setBookUp] = useState(true)
    useEffect(() => {
        if (!rowKeys || rowKeys.length === 0) {
            setBookUp(true)
        } else {
            setBookUp(false)
        }
    }, [rowKeys])

    const [bookDown, setBookDown] = useState(true)
    useEffect(() => {
        if (!rowKeys || rowKeys.length === 0) {
            setBookDown(true)
        } else {
            setBookDown(false)
        }
    }, [rowKeys])

    const [book, setBook] = useState([])
    const [loading2, setLoading2] = useState(true)
    const [selectTypeId, setSelectTypeId] = useState()
    const [current, setCurrent] = useState(1)
    const changePage = page => {
        setCurrent(page)
        setRowKeys()
    }

    const selectType = (key) => {
        setCurrent(1)
        setLoading(true)
        setSelectTypeId(key)
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

    const clickBookUp = () => {
        booksService
            .upBooks(rowKeys)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('上架失败，请稍后重试')
                } else {
                    message.success(`共上架${response}本图书`)
                    setRowKeys()
                }
            })
            .catch(error => {
                message.error(`服务器出现错误，请稍后再试`)
                console.error(error)
            })
    }

    const clickBookDown = () => {
        booksService
            .downBooks(rowKeys)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('下架失败，请稍后重试')
                } else {
                    message.success(`共下架${response}本图书`)
                    setRowKeys()
                }
            })
            .catch(error => {
                message.error(`服务器出现错误，请稍后再试`)
                console.error(error)
            })
    }

    const onSearch = () => {
        setCurrent(1)
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

    const showModal = (record) => {
        setBookName(record.bookName)
        setBookAuthor(record.bookAuthor)
        setBookIsbn(record.bookIsbn)
        setOldIsbn(record.bookIsbn)
        setBookMoney(record.bookMoney)
        setBookPress(record.bookPress)
        setBookPublicTime(record.bookPublictime)
        setBookTypeId(record.bookTypeId)
        setVisible(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        if (bookIsbn === '' || bookName === '' || bookMoney === '' || bookPublicTime === '' || bookTypeId === '' || bookPress === '' || bookAuthor === '') {
            message.info('所有内容不能为空')
            setConfirmLoading(false)
            return
        }
        const objectBook = {
            bookIsbn: bookIsbn,
            bookName: bookName,
            bookMoney: bookMoney,
            bookPublictime: bookPublicTime,
            bookTypeId: bookTypeId,
            bookType: types.filter(type => type.bookTypeId === bookTypeId),
            bookPress: bookPress,
            bookAuthor: bookAuthor,
            oldIsbn: oldIsbn,
        }
        bookService
            .updateBook(objectBook)
            .then(response => {
                if (Number(response) === -1) {
                    setConfirmLoading(false)
                    message.error('修改失败，请稍后重试')
                } else {
                    response = JSON.parse(response)
                    let newBooks = books.map(book => book.bookIsbn === oldIsbn ? response : book)
                    setBooks(newBooks)
                    setLoading(true)
                    if (filter === '') {
                        if (selectTypeId === 0) {
                            setFilterBooks(books)
                            setLoading(false)
                        } else {
                            newBooks = []
                            books.forEach(book => {
                                if (book.bookTypeId === selectTypeId) {
                                    newBooks = newBooks.concat(book)
                                }
                            })
                            setFilterBooks(newBooks)
                            setLoading(false)
                        }
                    } else {
                        newBooks = []
                        books.forEach(book => {
                            if (book.bookName.indexOf(filter) !== -1) {
                                newBooks = newBooks.concat(book)
                            }
                        })
                        setFilterBooks(newBooks)
                        setLoading(false)
                    }
                    setVisible(false)
                    setLoading(false)
                    message.success('修改成功')
                    setConfirmLoading(false)
                }
            })
            .catch(error => {
                setConfirmLoading(false)
                message.error('服务器出现错误，请稍后再试')
                console.error(error)
                setLoading(false)
            })
    }

    const showModal2 = (bookIsbn) => {
        setLoading2(true)
        setVisible2(true)
        bookService
            .getBook(bookIsbn)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                    setVisible2(false)
                } else {
                    response = JSON.parse(response)
                    setBook(response)
                    setLoading2(false)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                setVisible2(false)
                console.error(error)
                setLoading2(false)
            })
    }

    const clickOneBookUp = (record) => {
        bookService
            .bookUp(record.bookId)
            .then(response => {
                if (Number(response) === 1) {
                    showModal2(record.bookIsbn)
                    message.success('上架成功')
                } else if (Number(response) === -1) {
                    message.error('上架失败')
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.error(error)
            })
    }

    const clickOneBookDown = (record) => {
        bookService
            .bookDown(record.bookId)
            .then(response => {
                if (Number(response) === 1) {
                    showModal2(record.bookIsbn)
                    message.success('下架成功')
                } else if (Number(response) === -1) {
                    message.error('下架失败')
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.error(error);
            })
    }

    const clickOneBookLost = (record) => {
        bookService
            .bookLost(record.bookId)
            .then(response => {
                if (Number(response) === 1) {
                    showModal2(record.bookIsbn)
                    message.success('已设为丢失')
                } else if (Number(response) === -1) {
                    message.error('设置失败')
                }
            }).catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.error(error)
            })
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
                        <Button style={{ margin: '16px auto' }} disabled={bookUp} onClick={clickBookUp}>上架</Button>
                    </Col>
                    <Col>
                        <Button style={{ margin: '16px auto' }} disabled={bookDown} onClick={clickBookDown}>下架</Button>
                    </Col>
                    <Col span={2} offset={13}>
                        <Upload name="file" action='http://localhost:9090/ExcelToMysql_war_exploded/BookServlet' accept=".xlsx" headers={{ authorization: 'authorization-text' }} onChange={(info) => {
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList)
                            }
                            if (info.file.status === 'done') {
                                message.success(`${info.file.name}文件上传成功`)
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
                                        console.error(error)
                                        setLoading(false)
                                    })
                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name}文件上传失败`)
                            }
                        }}>
                            <Button icon={<UploadOutlined />} style={{ margin: '16px auto auto' }}>上传图书</Button>
                        </Upload>
                    </Col>
                    <Col span={4} offset={1}>
                        <Search placeholder="输入关键字搜索书名" value={filter} onChange={(event) => { setFilter(event.target.value) }} onSearch={onSearch} style={{ margin: '16px auto' }} />
                    </Col>
                </Row>
                <Content className="site-layout-background" style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}>
                    <Table dataSource={filterBooks} loading={loading} pagination={{ current: current, onChange: changePage, total: filterBooks.length }} rowKey={(record) => { return record.bookIsbn }} rowSelection={{ ...rowSelection }}>
                        <rowSelection />
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
                                <Button onClick={() => { showModal(record) }}>编辑</Button>
                                <Button onClick={() => { showModal2(record.bookIsbn) }}>查看详情</Button>
                            </Space>
                        )} />
                    </Table>
                    <Modal title='编辑' visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={() => { setVisible(false) }} destroyOnClose={true}>
                        <Row>
                            <Col>
                                图书名称<Input value={bookName} onChange={(event) => { setBookName(event.target.value)}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                图书作者<Input value={bookAuthor} onChange={(event) => { setBookAuthor(event.target.value)}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                ISBN<Input value={bookIsbn} onChange={(event) => { setBookIsbn(event.target.value)}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                价格<InputNumber min={0} defaultValue={bookMoney} onChange={(value) => { setBookMoney(value)}} precision={2} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                出版时间<DatePicker defaultValue={moment(bookPublicTime)} onChange={(date, dateString) => { setBookPublicTime(dateString) }} disabledDate={(current) => { return current > moment().startOf('day')}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                出版社<Input value={bookPress} onChange={(event) => { setBookPress(event.target.value)}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                图书类别
                                <Select defaultValue={bookTypeId} onChange={(value) => { setBookTypeId(value)}} style={{ width: 200 }}>
                                    {
                                        types.map(type => {
                                            return (
                                                <Option value={type.bookTypeId} key={type.bookTypeId}>{type.bookType}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Modal>
                    <Modal title='详细信息' visible={visible2} onOk={() => { setVisible2(false) }} onCancel={() => { setVisible2(false) }} width={1000} destroyOnClose={true}>
                        <Table dataSource={book} loading={loading2} pagination={{ defaultCurrent: '1', total: book.length }} rowKey={record => { return record.bookId }}>
                            <Column title='图书编号' dataIndex='bookId' key='bookId' />
                            <Column title='图书名称' dataIndex='bookName' key='bookName' />
                            <Column title='状态' dataIndex='bookStatus' key='bookStatus' render={bookStatus => (
                                bookStatus === 0
                                    ? <span>下架</span>
                                    : bookStatus === 1
                                        ? <span>上架</span>
                                        : bookStatus === 2
                                            ? <span>借出</span>
                                            : bookStatus === 3 &&
                                            <span>丢失</span>
                            )} />
                            <Column title='上架时间' dataIndex='bookRackTime' key='bookRackTime' />
                            <Column title='书架位置' dataIndex='bookRackPosition' key='bookRackPosition' />
                            <Column title='操作' key='action' render={(text, record) => (
                                <Space>
                                    {
                                        record.bookStatus === 0 ? <Button onClick={() => { clickOneBookUp(record) }}>上架</Button> : <Button disabled>上架</Button>
                                    }
                                    {
                                        record.bookStatus === 1 ? <Button onClick={() => { clickOneBookDown(record) }}>下架</Button> : <Button disabled>下架</Button>
                                    }
                                    {
                                        record.bookStatus === 3 ? <Button disabled>丢失</Button> : <Button onClick={() => { clickOneBookLost(record) }}>丢失</Button>
                                    }
                                </Space>
                            )} />
                        </Table>
                    </Modal>
                </Content>
            </Layout>
        </div>
    )
}

export default Books