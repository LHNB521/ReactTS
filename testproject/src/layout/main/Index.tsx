import React, { Component } from "react";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import MainHeader from "./MainHeader";
import logo from '@/assets/images/logo.jpg'
import RouterView from '../../routes/RouterView'
import SideMenu from "./SideMenu";
const { Sider, Content } = Layout;

class Index extends Component<any, any>{
    render() {
        const { collapsed } = this.props
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <img src={logo} style={{ width: '32px', height: '32px', margin: '0 10px 0 0' }} alt="" />
                        {collapsed ? null : <span>后台管理系统</span>}
                    </div>
                    <div style={{margin:'30px 0 0 0'}}>
                        <SideMenu />
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <MainHeader />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            position: 'relative'
                        }}
                    >
                        <RouterView />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = (state: any) => {
    return state.mainheader
}
export default connect(mapStateToProps)(Index);