import { Button, message, Space, Table } from "antd"
import { Content } from "antd/lib/layout/layout"
import Column from "antd/lib/table/Column"
import { useEffect, useState } from "react"
import buyService from "../services/buy"

const Buy = (props) => {
    const [recommendedBooks, setRecommendedBooks] = useState([])
    useEffect(() => {
        buyService
            .getRecommendedBooks()
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现异常，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setRecommendedBooks(response)
                }
            })
            .catch(error => {
                message.error('服务器出现异常，请稍后再试')
                console.error(error);
            })
        setLoading(false)
    }, [])

    const [loading, setLoading] = useState(true)

    const pass = (record) => {
        buyService
            .review(record.bookIsbn, 1)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('操作成功')
                    let newRecommendedBooks = recommendedBooks.filter(recommendedBook => recommendedBook.bookIsbn !== record.bookIsbn)
                    setRecommendedBooks(newRecommendedBooks)
                } else if (Number(response) === -1) {
                    message.error('操作失败')
                }
            })
            .catch(error => {
                message.error('服务器出现异常，请稍后再试')
                console.error(error);
            })

    }

    const fail = (record) => {
        buyService
            .review(record.bookIsbn, 0)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('操作成功')
                    let newRecommendedBooks = recommendedBooks.filter(recommendedBook => recommendedBook.bookIsbn !== record.bookIsbn)
                    setRecommendedBooks(newRecommendedBooks)
                } else if (Number(response) === -1) {
                    message.error('操作失败')
                }
            })
            .catch(error => {
                message.error('服务器出现异常，请稍后再试')
                console.error(error);
            })
    }

    return (
        <div>
            <Content className="site-layout-background" style={{
                padding: 24,
                margin: 0,
                minHeight: 280
            }}>
                <Table dataSource={recommendedBooks} loading={loading} pagination={{ defaultCurrent: 1, total: recommendedBooks.length }} rowKey={(record) => { return record.bookIsbn }}>
                    <Column title='图书名称' dataIndex='bookName' key='bookName' />
                    <Column title='图书作者' dataIndex='bookAuthor' key='bookAuthor' />
                    <Column title='ISBN' dataIndex='bookIsbn' key='bookIsbn' />
                    <Column title='价格' dataIndex='bookMoney' key='bookMoney' />
                    <Column title='出版时间' dataIndex='bookPublictime' key='bookPublictime' />
                    <Column title='出版社' dataIndex='bookPress' key='bookPress' />
                    <Column title='图书类别' dataIndex='bookType' key='bookType' />
                    <Column title='操作' key='action' render={(text, record) => (
                        <Space>
                            <Button onClick={() => { pass(record) }}>通过</Button>
                            <Button onClick={() => { fail(record) }}>不通过</Button>
                        </Space>
                    )} />
                </Table>
            </Content>
        </div>
    )
}

export default Buy