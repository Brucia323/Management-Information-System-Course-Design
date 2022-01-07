import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from 'antd';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <>
                    <h1>啊哦~，好像出现了一些错误😥</h1>
                    <Button onClick={() => { window.close() }}>关闭</Button>
                </>
            );
        }

        return this.props.children;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Router>
                <App />
            </Router>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.error))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
