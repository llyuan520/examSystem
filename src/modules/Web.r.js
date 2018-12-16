/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React,{Component} from 'react'
import {Layout} from 'antd'
import PropTypes from 'prop-types'
import {withRouter,Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {RouteWithSubRoutes,Header} from 'components'
import {composeMenus} from 'utils'
import Sider from './Sider'
import routes from '../modules/routes'
import {logout} from '../redux/ducks/user'


const { Content } = Layout;

class Web extends Component {

    static propTypes = {
        history:PropTypes.object.isRequired
    }

    state = {
        collapsed: false
    }

    handleToggleCollapse=collapsed=>{
        this.setState({
            collapsed
        })
    }
    checkLoggedIn= props =>{
        const {isAuthed,history} = props;
        if(!isAuthed){
            history.replace('/ssoLogin');
        }
    }
    componentWillMount(){
        this.checkLoggedIn(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.checkLoggedIn(nextProps)
    }
    
    render() {
        const { collapsed } = this.state
        return (
            <Layout>
                <Sider collapsed={collapsed} menusData={routes} />
                <Layout style={{ msFlex:'1 1 auto', msOverflowY: 'hidden',minHeight:'100vh'}} >
                    <Header logout={()=>this.props.logout()} handleToggleCollapse={this.handleToggleCollapse.bind(this)} />
                        <Content style={{ margin: '8px 12px 0'}}>
                            <Switch>
                                {
                                    composeMenus(routes).map((route, i) => (
                                        <RouteWithSubRoutes key={i} {...route}/>
                                    ))
                                }
                                <Route path="*" component={()=><div>no match</div>} />
                            </Switch>
                        </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(connect(state=>({
    personal:state.user.get('personal'),
    isAuthed:state.user.get('isAuthed'),
    realName:state.user.getIn(['personal','realname']),
    username:state.user.getIn(['personal','username']),
}),dispatch=>({
    logout:logout(dispatch)
}))(Web))