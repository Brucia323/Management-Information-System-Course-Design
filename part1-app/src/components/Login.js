import { Button, Col, Input, message, Row } from "antd"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import loginService from "../services/login"

const Login = (props) => {
    const history = useHistory()

    const [userid, setUserid] = useState('')
    const changeUserid = (event) => {
        setUserid(event.target.value)
    }

    const [password, setPassword] = useState('')
    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
        if (userid === '' || password === '') {
            message.warning("账号或密码为空")
            setLoading(false)
        } else {
            const user = {
                userid: userid,
                password: password
            }
            loginService(user)
                .then(response => {
                    if (response === '-1') {
                        message.error('账号或密码错误')
                        setLoading(false)
                    } else {
                        response = JSON.parse(response)
                        if (Number(response.result) === 1) {
                            message.success('登录成功')
                            props.onLogin(userid, 'adminName')
                            history.push('/')
                            setLoading(false)
                        } else {
                            message.error('服务器出现错误，请稍后再试')
                            setLoading(false)
                        }
                    }
                })
                .catch(error => {
                    message.error('服务器出现错误，请稍后再试')
                    console.error(error)
                    setLoading(false)
                })
        }
    }

    const onKeyUp = (event) => {
        if (event.keyCode === 13) {
            handleClick()
        }
    }

    return (
        <div>
            <Row>
                <Col span={4} offset={10}>
                    <h1 style={{ margin: '24px auto' }}>登录</h1>
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={10}>
                    账号<Input placeholder="请输入账号" value={userid} onChange={changeUserid} onKeyUp={onKeyUp} />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={10}>
                    密码<Input.Password placeholder="请输入密码" value={password} onChange={changePassword} onKeyUp={onKeyUp} />
                </Col>
            </Row>
            <Row>
                <Col offset={10}>
                    <Button type="primary" onClick={handleClick} style={{ margin: '24px auto' }} loading={loading}>登录</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login