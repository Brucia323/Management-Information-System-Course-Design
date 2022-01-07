import './App.css';
import { useState } from 'react'
import { Button, Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Books from './components/Books';
import History from './components/History';
import Login from './components/Login';
import User from './components/User';
import More from './components/More';

function App() {
    const [userid, setUserid] = useState(null)
    const [username, setUsername] = useState(null)

    const login = (userid, username) => {
        setUserid(userid)
        setUsername(username)
    }

    return (
        <Layout>
            <Header className='header' style={{ position: 'sticky', top: '0px', zIndex: '99' }}>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1'>
                        <Link to='/'>图书浏览</Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Link to='/history'>借阅历史</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link to='/user'>个人信息</Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link to='/more'>更多</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Switch>
                    <Route path='/user'>
                        {userid ? <User userid={userid} username={username} /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/login'>
                        <Login onLogin={login} />
                    </Route>
                    <Route path='/history'>
                        {userid ? <History userid={userid} /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/more'>
                        {userid ? <More userid={userid} /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/'>
                        {userid ? <Books userid={userid} /> : <Redirect to='/login' />}
                    </Route>
                </Switch>
            </Layout>
        </Layout>
    );
}

export default App;
