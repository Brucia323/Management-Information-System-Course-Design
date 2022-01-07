import { Button, Layout, Menu, message, Space, Table } from "antd"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import Column from "antd/lib/table/Column"
import { useState,useEffect } from "react"
import historyService from '../services/history'

const History = (props) => {
    const [key, setKey] = useState(0)
    const [books, setBooks] = useState([])
    useEffect(() => {
        historyService
            .getReserve(props.userid)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setBooks(response)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
    }, [props.userid])
    const [loading, setLoading] = useState(false)

    const onSelect = (key) => {
        setLoading(true)
        setKey(key)
        if (key === 0) {
            historyService
                .getReserve(props.userid)
                .then(response => {
                    if (Number(response) === -1) {
                        message.error('服务器出现错误，请稍后再试')
                    } else {
                        response = JSON.parse(response)
                        setBooks(response)
                    }
                })
                .catch(error => {
                    message.error('服务器出现错误，请稍后再试')
                    console.log(error)
                })
        } else if (key === 1) {
            historyService
                .getBorrow(props.userid)
                .then(response => {
                    if (Number(response) === -1) {
                        message.error('服务器出现错误，请稍后再试')
                    } else {
                        response = JSON.parse(response)
                        setBooks(response)
                    }
                })
                .catch(error => {
                    message.error('服务器出现错误，请稍后再试')
                    console.log(error)
                })
        }
        setLoading(false)
    }

    const cancelReserve = (record) => {
        historyService
            .cancelReserve(props.userid, record.bookIsbn)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('取消成功')
                } else if (Number(response) === -1) {
                    message.warning('取消失败')
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
        historyService
            .getReserve(props.userid)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setBooks(response)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
    }

    const returnBook = (record) => {
        historyService
            .returnBook(props.userid, record.bookId, record.borrowId)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('还书失败')
                } else {
                    message.success('还书成功')
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error);
            })
        historyService
            .getBorrow(props.userid)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setBooks(response)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
    }

    const renew = (record) => {
        historyService
            .renew(props.userid, record.borrowId)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('续借失败')
                } else {
                    message.success('续借成功')
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error);
            })
        historyService
            .getBorrow(props.userid)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setBooks(response)
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.log(error)
            })
    }

    return (
        <div>
            <Sider width={200} className="site-layout-background" style={{ float: 'left' }}>
                <Menu mode="inline" defaultSelectedKeys={['0']} style={{ hight: '100%', borderRight: 0 }}>
                    <Menu.Item key={0} onClick={() => { onSelect(0) }}>预约记录</Menu.Item>
                    <Menu.Item key={1} onClick={() => { onSelect(1) }}>借阅记录</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
                <Content className="site-layout-background" style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}>
                    {
                        key === 0
                            ? <Table dataSource={books} loading={loading} pagination={{ defaultCurrent: 1, total: books.length }} rowKey={(record) => { return record.bookingId }}>
                                <Column title='图书名称' dataIndex='bookName' key='bookName' />
                                <Column title='图书作者' dataIndex='bookAuthor' key='bookAuthor' />
                                <Column title='ISBN' dataIndex='bookIsbn' key='bookIsbn' />
                                <Column title='价格' dataIndex='bookMoney' key='bookMoney' />
                                <Column title='出版时间' dataIndex='bookPublictime' key='bookPublictime' />
                                <Column title='出版社' dataIndex='bookPress' key='bookPress' />
                                <Column title='图书类别' dataIndex='bookType' key='bookType' />
                                <Column title='预约日期' dataIndex='bookingTime' key='bookingTime' />
                                <Column title='预约状态' dataIndex='bookingStatus' key='bookingStatus' render={bookingStatus => (
                                    Number(bookingStatus) === 0
                                        ? <span>预约中</span>
                                        : Number(bookingStatus) === 1
                                            ? <span>可借阅</span>
                                            : Number(bookingStatus) === 2
                                                ? <span>已取消</span>
                                                : Number(bookingStatus) === 3
                                                    ? <span>已下架</span>
                                                    : Number(bookingStatus) === 4 &&
                                                    <span>已完成</span>
                                )} />
                                <Column title='操作' key='action' render={(text, record) => (
                                    <Space>
                                        <Button onClick={() => { cancelReserve(record) }}>取消预约</Button>
                                    </Space>
                                )} />
                            </Table>
                            : <Table dataSource={books} loading={loading} pagination={{ defaultCurrent: 1, total: books.length }} rowKey={(record) => { return record.borrowId }}>
                                <Column title='图书编号' dataIndex='bookId' key='bookId' />
                                <Column title='图书名称' dataIndex='bookName' key='bookName' />
                                <Column title='借阅日期' dataIndex='borrowBorrowTime' key='borrowBorrowTime' />
                                <Column title='续借状态' dataIndex='borrowReborrowTime' key='borrowReborrowTime' render={borrowReborrowTime => (
                                    borrowReborrowTime
                                        ? <span>已续借</span>
                                        : <span>未续借</span>
                                )} />
                                <Column title='还书日期' dataIndex='borrowReturnTime' key='borrowReturnTime' />
                                <Column title='操作' key='action' render={(text, record) => (
                                    <Space>
                                        {
                                            record.borrowReturnTime
                                                ? <Button disabled>还书</Button>
                                                : <Button onClick={() => { returnBook(record) }}>还书</Button>
                                        }
                                        {
                                            record.borrowReborrowTime || record.borrowReturnTime
                                                ? <Button disabled>续借</Button>
                                                : <Button onClick={() => { renew(record) }}>续借</Button>
                                        }

                                    </Space>
                                )} />
                            </Table>
                    }
                </Content>
            </Layout>
        </div>
    )
}

export default History