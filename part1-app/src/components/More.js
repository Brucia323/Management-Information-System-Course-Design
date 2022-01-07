import { Button, Col, InputNumber, Layout, Menu, message, Row, Statistic, Modal } from "antd"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { useEffect, useState } from "react"
import moreService from "../services/more"
import { Pie } from '@ant-design/charts';

const More = (props) => {
    const [key, setKey] = useState(0)
    const [borrowCount, setBorrowCount] = useState(0)
    const [data, setData] = useState()
    useEffect(() => {
        moreService
            .getData()
            .then(response => {
                if (Number(response) !== -1) {
                    response = JSON.parse(response)
                    setBorrowCount(response.count)
                    let dataList = response.list.map(count => {
                        return {
                            type: count.type,
                            value: Number(count.value)
                        }
                    })
                    setData(dataList)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])
    useEffect(() => {
        moreService
            .getData()
            .then(response => {
                if (Number(response) !== -1) {
                    response = JSON.parse(response)
                    setBorrowCount(response.count)
                    let dataList = response.list.map(count => {
                        return {
                            type: count.type,
                            value: Number(count.value)
                        }
                    })
                    setData(dataList)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [key])

    const [teacherMaxCount, setTeacherMaxCount] = useState()
    const [studentMaxCount, setStudentMaxCount] = useState()
    const [teacherMaxTime, setTeacherMaxTime] = useState()
    const [studentMaxTime, setStudentMaxTime] = useState()
    const [lateRatio, setLateRatio] = useState()
    const [addTime, setAddTime] = useState()
    useEffect(() => {
        moreService.getRule().then(response => {
            if (Number(response) === -1) {
                message.error('服务器异常')
            } else {
                response = JSON.parse(response)
                setTeacherMaxCount(Number(response.teacherMaxCount))
                setStudentMaxCount(Number(response.studentMaxCount))
                setTeacherMaxTime(Number(response.teacherMaxTime))
                setStudentMaxTime(Number(response.studentMaxTime))
                setLateRatio(Number(response.lateRatio))
                setAddTime(Number(response.addTime))
            }
        }).catch(error => {
            message.error('服务器异常')
            console.error(error);
        })
    }, [])
    useEffect(() => {
        moreService.getRule().then(response => {
            if (Number(response) === -1) {
                message.error('服务器异常')
            } else {
                response = JSON.parse(response)
                setTeacherMaxCount(Number(response.teacherMaxCount))
                setStudentMaxCount(Number(response.studentMaxCount))
                setTeacherMaxTime(Number(response.teacherMaxTime))
                setStudentMaxTime(Number(response.studentMaxTime))
                setLateRatio(Number(response.lateRatio))
                setAddTime(Number(response.addTime))
            }
        }).catch(error => {
            message.error('服务器异常')
            console.error(error);
        })
    }, [key])

    return (
        <div>
            <Sider width={200} className="site-layout-background" style={{ float: 'left' }}>
                <Menu mode="inline" defaultSelectedKeys={['0']} style={{ hight: '100%', borderRight: 0 }}>
                    <Menu.Item key={0} onClick={() => { setKey(0) }}>规则修订</Menu.Item>
                    <Menu.Item key={1} onClick={() => { setKey(1) }}>数据汇总</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content className="site-layout-background" style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}>
                    {
                        key === 0 ? <Rule teacherMaxCount={teacherMaxCount} studentMaxCount={studentMaxCount} teacherMaxTime={teacherMaxTime} studentMaxTime={studentMaxTime} lateRatio={lateRatio} addTime={addTime} /> : key === 1 && <DataSum borrowCount={borrowCount} data={data} />
                    }
                </Content>
            </Layout>
        </div>
    )
}

const Rule = (props) => {
    const [teacherMaxCount, setTeacherMaxCount] = useState(props.teacherMaxCount)
    const [studentMaxCount, setStudentMaxCount] = useState(props.studentMaxCount)
    const [teacherMaxTime, setTeacherMaxTime] = useState(props.teacherMaxTime)
    const [studentMaxTime, setStudentMaxTime] = useState(props.studentMaxTime)
    const [lateRatio, setLateRatio] = useState(props.lateRatio)
    const [addTime, setAddTime] = useState(props.addTime)
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        if (teacherMaxCount === '' || studentMaxCount === '' || teacherMaxTime === '' || studentMaxTime === '' || lateRatio === '' || addTime === '') {
            message.info('所有表单项不能为空')
            return
        }
        setLoading(true)
        const rule = {
            teacherMaxCount: teacherMaxCount,
            studentMaxCount: studentMaxCount,
            teacherMaxTime: teacherMaxTime,
            studentMaxTime: studentMaxTime,
            lateRatio: lateRatio,
            addTime: addTime
        }
        moreService.setRule(rule).then(response => {
            if (Number(response) === 1) {
                Modal.success({
                    content: '修改成功',
                });
                setLoading(false)
            } else if (Number(response) === -1) {
                message.error('修改失败')
                setLoading(false)
            }
            setLoading(false)
        }).catch(error => {
            message.error('服务器异常')
            console.error(error);
            setLoading(false)
        })
        setLoading(false)
    }

    return (
        <div>
            <Row>
                <Col span={8} offset={8}>
                    教师最大可借数量<InputNumber defaultValue={teacherMaxCount} onChange={value => setTeacherMaxCount(value)} min={0} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    学生最大可借数量<InputNumber defaultValue={studentMaxCount} onChange={value => setStudentMaxCount(value)} min={0} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    教师可借天数<InputNumber defaultValue={teacherMaxTime} onChange={value => setTeacherMaxTime(value)} min={0} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    学生可借天数<InputNumber defaultValue={studentMaxTime} onChange={value => setStudentMaxTime(value)} min={0} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    续借增加天数<InputNumber defaultValue={addTime} onChange={value => setAddTime(value)} min={0} />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    滞纳比例<InputNumber defaultValue={lateRatio} onChange={value => setLateRatio(value)} min={0} max={1} step='0.1' />
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={8}>
                    <Button onClick={handleClick} loading={loading}>提交</Button>
                </Col>
            </Row>
        </div>
    )
}

const DataSum = ({ borrowCount, data }) => {
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="图书借出次数" value={borrowCount} style={{ margin: 100 }} />
                </Col>
                <Col span={12}>
                    <Pie {...config} />
                </Col>
            </Row>
        </div>
    )
}

export default More