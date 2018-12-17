/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React from 'react'
import {message} from 'antd'
import DocumentTitle from 'react-document-title'
import request from './request'
import composeMenus from './composeMenus'
import regRules from './regRules'
import getFields from './getFields'
import moment from "moment";

const wrapPage = (title,Component) => props => <DocumentTitle title={`${title}`}>{<Component {...props}/>}</DocumentTitle>

const getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
const getDict = type => {
    return new Promise(function (resolve, reject) {
        request.get(`/sys/dict/listBaseInfo/${type}`)
            .then(({data})=>{
                if(data.code===200){
                    resolve(data.data)
                }else{
                    reject(data.msg)
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    })
}
const requestDict = async (type,callback)=>{
    let result = await getDict(type);
    callback(result)
}

//获取html
const htmlDecode = html =>{
    if(html){
        let div = document.createElement( 'div' );
        div.innerHTML = html;
        return div.textContent;
    }
};

//将0.5转换成50%
const toPercent = val => {
    let valNum = Number(val);
    if (isNaN(valNum)){
        return val;
    }else if (valNum === 0) {
        return valNum;
    }
    return `${valNum * 100}%`;
};

//将50%转换成0.5
const fromPercent = val=>{
    let valTrim = val.replace?val.replace('%',''):val;
    let valNum = Number(valTrim);
    if(isNaN(valNum))return val;
    return valNum/100;
}


//设置select值名不同
const setFormat = data =>{
    return data.map(item=>{
        return{
            //...item,
            value:item.id,
            text:item.name
        }
    })
}

const parseJsonToParams = data=>{
    let str = '';
    for(let key in data){
        if(typeof data[key] !== 'undefined' &&  data[key] !== undefined &&  data[key] !== '' && data[key] !== 'null' && data[key] !== null){
            str += `${key}=${data[key]}&`
        }
    }
    return str;
}

/**
 * 判断是否为空
 * @param val {string} 字符串
 */
const isEmpty = val=> {
    return val === null || val === undefined || val.trim() === ''
}

const formatMoment = values => {
    for (let key in values) {
      if (
        Array.isArray(values[key]) &&
        values[key].length === 2 &&
        moment.isMoment(values[key][0])
      ) {
        //当元素为数组&&长度为2&&是moment对象,那么可以断定其是一个rangePicker
        values[`${key}Start`] = values[key][0].format("YYYY-MM-DD");
        values[`${key}End`]   = values[key][1].format("YYYY-MM-DD");
        values[key]           = undefined;
      }
      if (moment.isMoment(values[key])) {
        //格式化一下时间 YYYY-MM类型
        if (moment(values[key].format("YYYY-MM"), "YYYY-MM", true).isValid()) {
          values[key] = values[key].format("YYYY-MM");
        }
      }
    }
    return values;
  };

export {
    wrapPage,
    regRules,
    request,
    getUrlParam,
    composeMenus,
    requestDict,
    getFields,
    htmlDecode,
    toPercent,
    fromPercent,
    setFormat,
    parseJsonToParams,
    isEmpty,
    formatMoment,
}