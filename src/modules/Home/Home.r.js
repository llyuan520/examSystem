
/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :TODO: 可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
// import LoadAble from 'react-loadable'
import {withRouter} from 'react-router-dom'
//import {LoadingPage} from 'components'
import { Layout } from 'antd'
import './index.less'


class Home extends Component {

    render() {
        return (
            <Layout style={{background:'transparent'}} >
                待我办理的申报任务
            </Layout>
        )
    }
}
export default withRouter(connect(state=>({
    options:state.user.getIn(['personal','options']),
    type:state.user.getIn(['personal','type']),
}))(Home))