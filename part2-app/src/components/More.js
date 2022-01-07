import { Button, Col, DatePicker, Input, InputNumber, Menu, message, Modal, Row, Select } from "antd"
import Layout, { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { Option } from "antd/lib/mentions"
import { useEffect, useState } from "react"
import moreService from "../services/more"
import moment from 'moment'

const More = (props) => {
    const [key, setKey] = useState(0)

    return (
        <div>
            <Sider width={200} className="site-layout-background" style={{ float: 'left' }}>
                <Menu mode="inline" defaultSelectedKeys={['0']} style={{ hight: '100%', borderRight: 0 }}>
                    <Menu.Item key={0} onClick={() => { setKey(0) }}>读者荐购</Menu.Item>
                    <Menu.Item key={1} onClick={() => { setKey(1) }}>缴费</Menu.Item>
                    <Menu.Item key={2} onClick={() => { setKey(2) }}>图书归还</Menu.Item>
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
                            ? <RecommendBook userid={props.userid} />
                            : key === 1
                                ? <Pay userid={props.userid} />
                                : key === 2 &&
                                <Return userid={props.userid} />
                    }
                </Content>
            </Layout>
        </div>
    )
}

const RecommendBook = (props) => {
    const [bookName, setBookName] = useState('')
    const [bookIsbn, setBookIsbn] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookMoney, setBookMoney] = useState('')
    const [bookPress, setBookPress] = useState('')
    const [bookPublicTime, setBookPublicTime] = useState('')
    const [type, setType] = useState('')
    const [types, setTypes] = useState([])
    useEffect(() => {
        moreService
            .getTypes()
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器出现错误，请稍后再试')
                } else {
                    response = JSON.parse(response)
                    setTypes(response)
                }
            })
    }, [])

    const [loading, setLoading] = useState(false)

    const changeBookName = (event) => {
        setBookName(event.target.value)
    }

    const changeBookIsbn = (event) => {
        setBookIsbn(event.target.value)
    }

    const changeBookAuthor = (event) => {
        setBookAuthor(event.target.value)
    }

    const changeBookMoney = (value) => {
        setBookMoney(value)
    }

    const changeBookPress = (event) => {
        setBookPress(event.target.value)
    }

    const changeBookPublicTime = (date, dateString) => {
        setBookPublicTime(dateString)
    }

    const disabledDate = (current) => {
        return current > moment().startOf('day')
    }

    const changeType = (value) => {
        setType(value)
    }

    const onClick = () => {
        setLoading(true)
        if (bookName === '' || bookIsbn === '' || bookAuthor === '' || bookMoney === '' || bookPress === '' || bookPublicTime === '' || type === '') {
            message.info('所有表单项均为必填')
            setLoading(false)
            return
        }
        const book = {
            bookName: bookName,
            bookIsbn: bookIsbn,
            bookAuthor: bookAuthor,
            bookMoney: bookMoney,
            bookPress: bookPress,
            bookPublicTime: bookPublicTime,
            bookType: type
        }
        moreService.commit(book, props.userid).then(response => {
            setLoading(false)
            if (Number(response) === 1) {
                Modal.success({
                    content: '提交成功',
                });
            } else if (Number(response) === -1) {
                Modal.warning({
                    title: '这本书已经被推荐过了',
                });
            }
            setBookName('')
            setBookIsbn('')
            setBookAuthor('')
            setBookPress('')
        }).catch(error => {
            message.error('服务器出现错误，请稍后再试')
            console.error(error);
        })
    }

    return (
        <div>
            <Row>
                <Col span={8} offset={8}>
                    图书名称<Input value={bookName} onChange={changeBookName} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    ISBN<Input value={bookIsbn} onChange={changeBookIsbn} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    图书作者<Input value={bookAuthor} onChange={changeBookAuthor} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    图书价格<InputNumber min={0} onChange={changeBookMoney} precision={2} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    出版社<Input value={bookPress} onChange={changeBookPress} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    出版时间<DatePicker onChange={changeBookPublicTime} disabledDate={disabledDate} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    图书类别<Select onChange={changeType} style={{ width: 200 }}>
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
            <Row>
                <Col span={8} offset={8}>
                    <Button type="primary" onClick={onClick} loading={loading}>提交</Button>
                </Col>
            </Row>
        </div>
    )
}

const Pay = (props) => {
    const [money, setMoney] = useState(0)
    useEffect(() => {
        moreService.getMoney(props.userid).then(response => {
            if (Number(response) === -1) {
                message.error('服务器出现错误，请稍后再试')
            } else {
                setMoney(Number(response))
            }
        })
    }, [props.userid])

    const onClick = () => {
        moreService
            .setMoney(props.userid)
            .then(response => {
                if (Number(response) === 1) {
                    Modal.success({
                        content: '支付成功',
                    });
                    setMoney(0)
                } else if (Number(response) === -1) {
                    Modal.error({
                        title: '支付失败',
                    });
                }
            })
            .catch(error => {
                message.error('服务器出现错误，请稍后再试')
                console.error(error);
            })
    }
    return (
        <div>
            <Button type='primary' onClick={onClick}>支付{money}元</Button>
        </div>
    )
}

const Return = (props) => {
    // const [bookName, setBookName] = useState('')
    const [bookIsbn, setBookIsbn] = useState('')
    // const [bookAuthor, setBookAuthor] = useState('')
    // const [bookMoney, setBookMoney] = useState('')
    // const [bookPress, setBookPress] = useState('')
    // const [bookPublicTime, setBookPublicTime] = useState()
    // const [type, setType] = useState()
    // const [types, setTypes] = useState([])
    // useEffect(() => {
    //     moreService
    //         .getTypes()
    //         .then(response => {
    //             if (Number(response) === -1) {
    //                 message.error('服务器出现错误，请稍后再试')
    //             } else {
    //                 response = JSON.parse(response)
    //                 setTypes(response)
    //             }
    //         })
    // }, [])

    const [loading, setLoading] = useState(false)

    // const changeBookName = (event) => {
    //     setBookName(event.target.value)
    // }

    const changeBookIsbn = (event) => {
        setBookIsbn(event.target.value)
    }

    // const changeBookAuthor = (event) => {
    //     setBookAuthor(event.target.value)
    // }

    // const changeBookMoney = (value) => {
    //     setBookMoney(value)
    // }

    // const changeBookPress = (event) => {
    //     setBookPress(event.target.value)
    // }

    // const changeBookPublicTime = (date, dateString) => {
    //     setBookPublicTime(dateString)
    // }

    // const disabledDate = (current) => {
    //     return current > moment().startOf('day')
    // }

    // const changeType = (value) => {
    //     setType(value)
    // }

    const onClick = () => {
        setLoading(true)
        if (bookIsbn === '') {
            message.info('ISBN不能为空')
            setLoading(false)
            return
        }
        const book = {
            // bookName: bookName,
            bookIsbn: bookIsbn,
            // bookAuthor: bookAuthor,
            // bookMoney: bookMoney,
            // bookPress: bookPress,
            // bookPublicTime: bookPublicTime,
            // bookType: type
        }
        moreService.compensationBook(book, props.userid).then(response => {
            if (Number(response) === 1) {
                setLoading(false)
                Modal.success({
                    content: '提交成功，赔书已完成',
                });
            } else if (Number(response) === -1) {
                setLoading(false)
                Modal.error({
                    title: '提交失败',
                    content: '提交信息与原书信息不符',
                });
            }
            // setBookName('')
            setBookIsbn('')
            // setBookAuthor('')
            // setBookPress('')
            setLoading(false)
        }).catch(error => {
            message.error('服务器出现错误，请稍后再试')
            console.error(error);
            setLoading(false)
        })
        setLoading(false)
    }

    return (
        <div>
            {/* <Row>
                <Col span={8} offset={8}>
                    图书名称<Input value={bookName} onChange={changeBookName} />
                </Col>
            </Row> */}
            <Row>
                <Col span={8} offset={8}>
                    ISBN<Input value={bookIsbn} onChange={changeBookIsbn} />
                </Col>
            </Row>
            {/* <Row>
                <Col span={8} offset={8}>
                    图书作者<Input value={bookAuthor} onChange={changeBookAuthor} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    图书价格<InputNumber min={0} onChange={changeBookMoney} precision={2} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    出版社<Input value={bookPress} onChange={changeBookPress} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    出版时间<DatePicker onChange={changeBookPublicTime} disabledDate={disabledDate} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    图书类别<Select onChange={changeType} style={{ width: 200 }}>
                        {
                            types.map(type => {
                                return (
                                    <Option value={type.bookTypeId} key={type.bookTypeId}>{type.bookType}</Option>
                                )
                            })
                        }
                    </Select>
                </Col>
            </Row> */}
            <Row>
                <Col span={8} offset={8}>
                    <Button type="primary" onClick={onClick} loading={loading}>提交</Button>
                </Col>
            </Row>
        </div>
    )
}

export default More