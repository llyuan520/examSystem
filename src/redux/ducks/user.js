/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */

import { createActions, handleActions } from 'redux-actions'
//TODO:  npm 的时候必须加上版本号 4.0.0-rc.9  要不然 getIn() 用不了
import {fromJS} from 'immutable';
//import { request } from "utils"

const initialState = fromJS({
    /**用户个人信息*/
    personal:{
        id:null,// 用户id
        email:null ,// 邮箱
        phoneNumber:null ,// 手机号码
        realname:null ,// 真实姓名
        typen:null ,// [类型]；8192为管理员；8189为组织管理员类型 ；1为普通员工；
        userame:null ,// 用户名
    },

    /**登录凭证 - 用户身份令牌*/
    token:null,

    /**是否登录成功*/
    isAuthed:false,

});

export const {personal, token, isAuthed,} = createActions({
    PERSONAL: {
        /**增加*/
        INCREMENT: info => info
    },
    TOKEN:{
        /**增加*/
        INCREMENT:token => token,
    },
    IS_AUTHED:{
        /**登录*/
        LOGIN:() => true,
        /**退出*/
        LOGOUT:() => false
    },
})

export default handleActions({
    [personal.increment] : (state, {payload})=>{
        return state.set('personal', payload)
    },
    [token.increment] : (state, {payload})=>{
        return state.set('token', payload)
    },
    [isAuthed.login] : (state, {payload})=>{
        return state.set('isAuthed', payload)
    },
    [isAuthed.logout] : state=>{
        localStorage.clear();
        return initialState
    },
}, initialState)

export const login = dispatch => async ({username,loginToken,success,fail,type})=>{

    if(username === 'admin' && loginToken==='123456'){

        dispatch(token.increment(loginToken))

        //用户信息获取成功的话
        //所需信息全部加载完毕，完成登录
        dispatch(isAuthed.login())

        //执行登录成功回调
        success && success()
    }

    // try {
    //     //先退出
    //     dispatch(isAuthed.logout())
    //     //url登录直接获得token
    //     dispatch(token.increment(loginToken))
    //     //获取用户信息
    //     await request.post('/oauth/ssoLoginName',{username:username})
    //         .then(res=>{
    //             request.testSuccess(res.data,data=>{
    //                 //判断是否是管理员 and 是否有权限 没有就跳转到403页面
    //                 /*if(data.type !== 8192 && data.options<1){
    //                     window.location.href="/403";
    //                 }else {*/
    //                     dispatch(token.increment(data.token))
                        
    //                     //获取用户信息
    //                     dispatch(personal.increment(data))

    //                     //用户信息获取成功的话
    //                     //所需信息全部加载完毕，完成登录
    //                     dispatch(isAuthed.login())

    //                     //执行登录成功回调
    //                     success && success()
    //                 //}
    //             },err=>{
    //                 fail && fail(err)
    //                 console.log(`用户信息获取失败:${err}`)
    //             })
    //         }).catch(err=>{
    //             fail && fail(err.message)
    //         })

    // }catch(err) {
    //     console.log(err)
    // }
}

export const logout = dispatch => async () =>{
    //登出
    dispatch(isAuthed.logout())
}

export const saveToken = dispatch => async (data) =>{
    try {
        dispatch(token.increment(data))
    }catch (err){
        console.log(err)
    }
}

export const savePersonal = dispatch => async (data) =>{
    try {
        dispatch(personal.increment(data))
    }catch (err){
        console.log(err)
    }
}
