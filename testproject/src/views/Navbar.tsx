import React, { Component } from "react";
import type { MenuProps } from "antd";
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import './navbar.less';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}
const items: MenuItem[] = [
    getItem('主页', '1', <PieChartOutlined />),
    getItem('订单管理', '2', <DesktopOutlined />),
    getItem('菜单管理', '3', <ContainerOutlined />),
    getItem('管理员管理', '4', <AppstoreOutlined />),
];

const Navbar = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const onClick = (item: any) => {
        console.log(item)
    }
    return (
        <div style={{ width: 256 }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={onClick}
            />
        </div>
    );
};
export default Navbar;




// export default class Navbar extends Component {
//     render() {
//         return (
//             <nav className="nav-wrapper">
//                 <div className="list">
//                     <ul>
//                         <li><a href='/'>Home</a></li>
//                         <li><a href='/about'>About</a></li>
//                         <li><a href='/contact'>Contact</a></li>
//                     </ul>
//                 </div>
//             </nav>
//         )
//     }
// }
