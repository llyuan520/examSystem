/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {RouteWithSubRoutes} from 'components'
import {wrapPage} from 'utils';

import Web from 'modules/Web.r';
import Login from 'modules/Login';

const routes = [
    {
        path:'/web',
        component:wrapPage('信易联金融服务平台 – 首页', Web),
        name:'主页',
    },{
        path: '/ssoLogin',
        component: props =>wrapPage('信易联金融服务平台 – 首页', <Login {...props} />),
        name: 'url登录'
    },{
        path:'*',
        redirect:true,
        to:'/web'
    }
]

const mainRoute = (
    <Route
        render={({location}) => {

        const homeRoute = () => (
            <Redirect to="/login"/>
        );
        return(
            <Layout>
                <Route exact={true} strict={true} path="/" render={homeRoute} />
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes key={index} {...route}/>
                    ))}
                </Switch>

            </Layout>
        );
    }}
    />
);

export default mainRoute