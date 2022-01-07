import './App.css';
import { useState } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Books from './components/Books';
import Basics from './components/Basics';
import Buy from './components/Buy';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
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
                        <Link to='/'>图书信息管理</Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Link to='/basic'>基础信息管理</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link to='/buy'>荐购信息审核</Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link to='/more'>更多</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Switch>
                    <Route path='/login'>
                        <Login onLogin={login} />
                    </Route>
                    <Route path='/basic'>
                        {userid ? <Basics /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/buy'>
                        {userid ? <Buy /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/more'>
                        {userid ? <More /> : <Redirect to='/login' />}
                    </Route>
                    <Route path='/'>
                        {userid ? <Books /> : <Redirect to='/login' />}
                    </Route>
                </Switch>
            </Layout>
        </Layout>
    );
}

export default App;
