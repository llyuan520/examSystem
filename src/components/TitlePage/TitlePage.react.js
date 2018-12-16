/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React from 'react';
import DocumentTitle from 'react-document-title'
const wrapPage = (title,Component) => props => <DocumentTitle title={`${title}`}>{<Component {...props}/>}</DocumentTitle>
export default wrapPage