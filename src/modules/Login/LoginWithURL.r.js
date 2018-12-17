/**
 * Created by liuliyuan on 2018/5/8.
 */
import React,{Component} from 'react'
import {getUrlParam} from 'utils'
import {connect} from 'react-redux'
import {login} from 'redux/ducks/user'
import { compose } from 'redux';
class LoginWithURL extends Component{
    state = {
        message: '转跳中...'
    };

    //url通过token登录  /ssoLoginA?username=&token=
    loginWithSSO = (username,loginToken) => {
        const {login} = this.props;
        login({
            username,
            loginToken,
            success: () => {
                this.setState({
                    message: '获取信息成功正在跳转'
                });
            },
            fail: (message) => {
                this.setState({
                    message: message
                });
            }
        });
    }

    checkLoggedIn = (props) => {
        const {isAuthed, history} = props;
        if (isAuthed) {
            history.replace('/web');
        }
    }

    componentWillMount(){
        const username=getUrlParam('username'),
            loginToken=getUrlParam('loginToken');

        if(username && loginToken){
            this.loginWithSSO(username,loginToken)
        } else {
            this.setState({
                message: '跳转失败，无登录信息'
            });
        }

    }

    componentWillReceiveProps(nextProps){
        this.checkLoggedIn(nextProps);
    }
    render(){
        const { message } = this.state;
        return(
            <div>{message}</div>
        )
    }
}

const enhance = compose(
    connect(state=>({
        isAuthed:state.user.get('isAuthed')
    }),dispatch=>({
        login:login(dispatch),
    }))
)
export default enhance(LoginWithURL);
