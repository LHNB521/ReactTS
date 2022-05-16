import React, { FC } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useHistory } from 'react-router-dom'
import menus from '../../routes/menus';
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
    } as MenuItem;
}
const items: MenuItem[] = []
menus.forEach((item: any) => {
    items.push(getItem(item.title, item.key, <item.icon />))
})

const SideMenu: FC = () => {
    const history = useHistory()
    const goPage: MenuProps['onClick'] = e => {
        history.push(e.key)
    }
    return (
        <Menu
            onClick={goPage}
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={['/']}
        >
        </Menu>
    )

}

export default SideMenu;


