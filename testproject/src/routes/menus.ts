import { lazy } from 'react'
import {
    HomeOutlined
} from '@ant-design/icons'
// 导入路由管理工具
import { RouteConfig } from 'react-router-config'

const menus: RouteConfig = [
    {
        path: '/',
        title: '系统首页',
        key: '/',
        icon: HomeOutlined
    },
    {
        path: '/about',
        title: '订单管理',
        key: '/about',
        icon: HomeOutlined,
        component: lazy(() => import('../views/About'))
    },
    {
        path: '/contact',
        title: '菜单管理',
        key: '/contact',
        icon: HomeOutlined,
        component: lazy(() => import('../views/Contact'))
    }
]

export default menus;
