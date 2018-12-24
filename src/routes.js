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
import Exception403 from 'modules/Exception/403';
import Exception404 from 'modules/Exception/404';
import Exception500 from 'modules/Exception/500';

const routes = [
    {
        path:'/web',
        component:wrapPage('考务系统平台 – 首页', Web),
        name:'主页',
    },{
        path: '/ssoLogin',
        component:props => <Login {...props} />, //wrapPage('考务系统平台平台 – 首页', props => <Login {...props} />)
        name: 'url登录'
    },{
        path:'/403',
        component:wrapPage('403', Exception403),
        name:'403',
    },{
        path:'/404',
        component:wrapPage('404', Exception404),
        name:'404',
    },{
        path:'/500',
        component:wrapPage('500', Exception500),
        name:'500',
    // },{
    //     path:'/web/*',
    //     redirect:true,
    //     to:'/web'
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