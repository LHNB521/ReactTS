import React from "react";
import App from "./App";
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import store from "./store";
import zhCN from 'antd/lib/locale/zh_CN';
import "./index.css";
import { createRoot } from 'react-dom/client';

const container : any = document.getElementById('root');
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>
)
