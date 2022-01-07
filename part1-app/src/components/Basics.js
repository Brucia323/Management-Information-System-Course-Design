import { Layout, Menu, message, Row, Col, Table, Space, Button, Popconfirm, Upload } from "antd"
import Search from "antd/lib/input/Search"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import SubMenu from "antd/lib/menu/SubMenu"
import Column from "antd/lib/table/Column"
import { useState, useEffect } from "react"
import basicsServlet from '../services/basics'
import { UploadOutlined } from '@ant-design/icons'

const Basics = (props) => {
    const [openKeys, setOpenKeys] = useState(['1'])
    const [colleges, setColleges] = useState([])
    useEffect(() => {
        basicsServlet.getCollege().then(response => {
            if (Number(response) === -1) {
                message.error('服务器出现错误，请稍后再试')
            } else {
                response = JSON.parse(response)
                setColleges(response)
            }
        })
    }, [])

    const [majors, setMajors] = useState([])
    useEffect(() => {
        basicsServlet.getMajor().then(response => {
            if (Number(response) === -1) {
                message.error('服务器出现错误，请稍后再试')
            } else {
                response = JSON.parse(response)
                setMajors(response)
            }
        })
    }, [])

    const [filter, setFilter] = useState('')
    const [filterReaders, setFilterReaders] = useState([])
    const [readers, setReaders] = useState([])
    useEffect(() => {
        basicsServlet.getReader().then(response => {
            if (Number(response) === -1) {
                message.error('服务器出现错误，请稍后再试')
            } else {
                response = JSON.parse(response)
                setReaders(response)
                setFilterReaders(response)
            }
            setLoading(false)
        })
    }, [])

    const [loading, setLoading] = useState(true)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (colleges.indexOf(latestOpenKey) !== -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    const clickMajor = (key) => {
        setFilter('')
        if (key === 0) {
            setFilterReaders(readers)
        } else {
            let newReader = []
            readers.forEach(reader => {
                if (reader.majorId === key) {
                    newReader = newReader.concat(reader)
                }
            })
            setFilterReaders(newReader)
        }
    }

    const onChange = (event) => {
        setFilter(event.target.value)
    }

    const onSearch = () => {
        if (filter === '') {
            setFilterReaders(readers)
        } else {
            let newReader = []
            readers.forEach(reader => {
                if (reader.userName.indexOf(filter) !== -1) {
                    newReader = newReader.concat(reader)
                }
            })
            setFilterReaders(newReader)
        }
    }

    const handleOk = (record) => {
        setConfirmLoading(true)
        basicsServlet
            .resetPassword(record.userId)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('重置成功')
                } else if (Number(response) === -1) {
                    message.error('重置失败')
                }
            }).catch(error => {
                message.error('服务器出现错误，请稍后重试')
                console.error(error)
            })
        setConfirmLoading(false)
    }

    return (
        <div>
            <Sider width={256} className="site-layout-background" style={{ float: 'left' }}>
                <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }} defaultSelectedKeys={['0']}>
                    <Menu.Item key={0} onClick={() => { clickMajor(0) }}>全部</Menu.Item>
                    {
                        colleges.map(college => {
                            return (
                                <SubMenu key={college.collegeId} title={college.collegeName}>
                                    {
                                        majors.map(major => {
                                            return (
                                                major.collegeId === college.collegeId &&
                                                <Menu.Item key={major.majorId} onClick={() => { clickMajor(major.majorId) }}>{major.majorName}</Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Row>
                    <Col span={2}>
                        <Upload name="file" action='http://localhost:9090/ExcelToMysql_war_exploded/ReaderServlet' accept=".xlsx" headers={{ authorization: 'authorization-text' }} onChange={(info) => {
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList)
                            }
                            if (info.file.status === 'done') {
                                message.success(`${info.file.name}文件上传成功`)
                                basicsServlet.getReader().then(response => {
                                    if (Number(response) === -1) {
                                        message.error('服务器出现错误，请稍后再试')
                                    } else {
                                        response = JSON.parse(response)
                                        setReaders(response)
                                        setFilterReaders(response)
                                    }
                                    setLoading(false)
                                })
                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name}文件上传失败`)
                            }
                        }}>
                            <Button icon={<UploadOutlined />} style={{ margin: '16px auto auto' }}>基础信息上传</Button>
                        </Upload>
                    </Col>
                    <Col span={4} offset={18}>
                        <Search value={filter} onChange={onChange} onSearch={onSearch} style={{ margin: '16px auto' }} />
                    </Col>
                </Row>
                <Content className="site-layout-background" style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}>
                    <Table dataSource={filterReaders} loading={loading} pagination={{ defaultCurrent: 1, total: filterReaders.length }} rowKey={(record) => { return record.userId }}>
                        <Column title='姓名' dataIndex='userName' key='userName' />
                        <Column title='身份' dataIndex='userIdentity' key='userIdentity' render={userIdentity => (
                            userIdentity === 0
                                ? <span>老师</span>
                                : userIdentity === 1 &&
                                <span>学生</span>
                        )} />
                        <Column title='操作' key='action' render={(text, record) => (
                            <Space>
                                <Popconfirm title='确定要重置密码吗？' onConfirm={() => { handleOk(record) }} okButtonProps={{ loading: confirmLoading }} okText='确认' cancelText='取消'>
                                    <Button>重置密码</Button>
                                </Popconfirm>
                            </Space>
                        )} />
                    </Table>
                </Content>
            </Layout>
        </div>
    )
}

export default Basics