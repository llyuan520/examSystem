/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */

import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const RouteWithSubRoutes = (route) => {

    return route.redirect ? <Redirect from={route.from} to={route.to}/> :
        <Route path={route.path} render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes}/>
        )}/>
}

export default RouteWithSubRoutes