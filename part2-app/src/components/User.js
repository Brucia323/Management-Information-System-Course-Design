import { Button, Col, Input, message, Modal, Row } from "antd"
import { Content } from "antd/lib/layout/layout"
import { useState, useEffect } from "react"
import userService from '../services/user'

const User = (props) => {
    const [number, setNumber] = useState()
    const [totalNumber, setTotalNumber] = useState()
    const [days, setDays] = useState()
    const [rule1, setRule1] = useState()

    useEffect(() => {
        userService
            .getRule(props.userid)
            .then(response => {
                if (Number(response) === -1) {
                    message.error('服务器异常，请稍后重试')
                } else {
                    response = JSON.parse(response)
                    setNumber(response.number)
                    setTotalNumber(response.total)
                    setDays(response.days)
                    setRule1(response.rule1)
                }
            })
    }, [props.userid])

    const [visible, setVisible] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onClick = () => {
        setVisible(true)
    }

    const onOk = () => {
        userService
            .changePassword(props.userid, oldPassword, newPassword)
            .then(response => {
                if (Number(response) === 1) {
                    message.success('修改成功')
                } else if (Number(response) === -1) {
                    message.error('修改失败')
                }
            })
            .catch(error => {
                message.error('服务器异常，请稍后重试')
                console.log(error);
            })
        setVisible(false)
    }

    const onCancel = () => {
        setVisible(false)
    }

    const changeOldPassword = (event) => {
        setOldPassword(event.target.value)
    }

    const changeNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    return (
        <div>
            <Content className="site-layout-background" style={{
                padding: 24,
                margin: 0,
                minHeight: 280
            }}>
                <Row>
                    <Col offset={8} span={8}>
                        <h1>欢迎您，{props.username}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Button onClick={onClick}>修改密码</Button>
                        <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
                            旧密码<Input.Password value={oldPassword} onChange={changeOldPassword} placeholder="请输入旧密码" />
                            新密码<Input.Password value={newPassword} onChange={changeNewPassword} placeholder="请输入新密码" />
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <h2>借阅规则</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <span>可借数量：{number}/{totalNumber}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <span>可借天数：{days}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <span>图书滞纳的罚金规则：{rule1}</span>
                    </Col>
                </Row>
            </Content>
        </div>
    )
}

export default User