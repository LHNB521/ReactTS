import React, { Suspense, FC } from 'react';
import { Spin } from 'antd'
import { Switch, Route } from 'react-router-dom'
import menus from './menus'
const RouterView: FC = () => {
    const renderRoute = (menus: any) => {
        return menus.map((item: any) => {
            if(item.component){
                return <Route path={item.path} key={item.path} exact component={item.component} />
            }else {
                console.log('--------')
            }

        })
    }
    return (
        <Suspense fallback={<div className="loading"><Spin size="large" /></div>} >
            <Switch>
                {renderRoute(menus)}
            </Switch>
        </Suspense>
    )
}
export default RouterView