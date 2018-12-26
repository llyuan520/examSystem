import React, { Component } from 'react'
import { Card, Tree, Input, Row, message } from 'antd';
import {connect} from 'react-redux'
import _ from 'lodash';
import debounce from 'lodash/debounce'
import {request} from 'utils'

import './notSeletList.less'

const { TreeNode } = Tree;
const Search = Input.Search;

// 查询，搜索所有被选中的数据，并展开其父节点,依赖于parentId
const getFilterKeys = (searchValue,treeData) => {
    let keys = new Set();
    let current=treeData;
    do{
      let next = [];
      current.forEach(element => {
        if(element.name.indexOf(searchValue)>-1){
          keys.add(element.parentId)
        }
  
        if(element.children){
          next=[...next,...element.children]
        }
      });
      current = next;
    }while(current && current.length>0);
    return Array.from(keys);
}

class NotSelectList extends Component{
    constructor(props){
        super(props);
        this.getFilterKeys_ = debounce(this.getFilterKeys_,300)
    }

    static defaultProps={
        onlyCheckLeaf:false
    }

    state={
        loading:false,

        checkedKeys:[],
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,

        nCheckeData: []
    }
    
    componentDidMount(){
        const { deptId } = this.props
        
        deptId && this.getfindDeptUsers(deptId)
    }

    getfindDeptUsers=(deptId)=>{
        request.get(`/admin/user/findDeptUsers/${deptId}`)
            .then(({data}) => {
                console.log(data)
                debugger
                this.toggleLoading(false)
                this.setState({
                    nCheckeData:data
                })
            })
            .catch(err => {
                this.toggleLoading(false)
                message.error(err.msg)
            })
    }

    toggleLoading = loading => this.setState({loading})

    // onCheck=(checkedKeys,e)=>{
    //     this.setState({checkedKeys:checkedKeys})
    //     // 过滤掉非叶子节点
    //     if(this.props.onlyCheckLeaf){
    //       this.props.onChange && this.props.onChange(e.checkedNodes.filter(ele=>!(ele.props.children && ele.props.children.length>0)).map(ele=>ele.key));
    //     }else{
    //       this.props.onChange && this.props.onChange(checkedKeys)
    //     }
    // }
    getFilterKeys_=(searchValue)=>{
        const {treeData=[]} = this.props;
        this.setState({
          expandedKeys:searchValue?getFilterKeys(searchValue,treeData):[],
          searchValue,
          autoExpandParent: true,
        })
    }

    onChange=(e)=>{
        const value = e.target.value;
        this.getFilterKeys_(value);
    }
    
    onSelect = (selectedKeys, info) => {
        //const { treeData } = this.props;
        const selectedNodes = info.node.props.dataRef;
        if(selectedKeys[0] === '1') return
        
        if(this.state.nCheckeData.length > 1){
            this.setState({
                nCheckeData: _.uniq(_.concat(this.state.nCheckeData, selectedNodes))
            },()=>{
                //console.log(this.state.nCheckeData)
                this.props.setCheckeData(this.state.nCheckeData)
            })
        }else{
            this.setState(prevState => ({
                nCheckeData: prevState.nCheckeData.concat(selectedNodes)
            }),()=>{
                //console.log(this.state.nCheckeData)
                this.props.setCheckeData(this.state.nCheckeData)
            });
        }
    }

    onExpand = (expandedKeys) => {
        this.setState({
        expandedKeys,
        autoExpandParent: false,
        });
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children && item.children.length>0) {
            return (
                <TreeNode title={item.name} key={item.id} dataRef={item}>
                {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode title={item.name} key={item.id} {...item} dataRef={item} />;
    })

    render(){
        const {treeData,treeWrapperStyle} = this.props;
        const {loading, expandedKeys,checkedKeys,searchValue,autoExpandParent} = this.state;
        return (
            
            <Card 
                title={
                    <Row>
                         选人创建：<Search placeholder="根据名称查找" onChange={this.onChange} className="treeSearch" />
                    </Row>
                }
                loading={loading}
                className="treeCard"
                headStyle={{
                    padding:'0 24px',
                    height:32,
                }}
                bodyStyle={{
                    padding:0,
                }}
            > 
                <div style={treeWrapperStyle}>
                    {
                        treeData && treeData.length>0 && (
                            <Tree 
                                //selectable={false}
                                checkedKeys={checkedKeys}
                                expandedKeys={expandedKeys}
                                onExpand={this.onExpand}
                                filterTreeNode={(node)=>{
                                    return searchValue && node.props.title.indexOf(searchValue.trim())>-1
                                }}
                                autoExpandParent={autoExpandParent}
                                onSelect={this.onSelect}
                                >
                                {this.renderTreeNodes(treeData)}
                            </Tree>
                        )
                    }
                </div>
            </Card>
        )
        // return treeData.length>0 ? (
        //         // title="选择人员" 
        //         <Card 
        //             bordered={false} 
        //             loading={loading}
        //             bodyStyle={{
        //                 padding:0
        //             }}
        //         > 
        //             <Search placeholder="根据名称查找" onChange={this.onChange} />
        //             <div style={treeWrapperStyle}>
        //                 <Tree 
        //                     //selectable={false}
        //                     checkedKeys={checkedKeys}
        //                     expandedKeys={expandedKeys}
        //                     onExpand={this.onExpand}
        //                     filterTreeNode={(node)=>{
        //                         return searchValue && node.props.title.indexOf(searchValue.trim())>-1
        //                     }}
        //                     autoExpandParent={autoExpandParent}
        //                     onSelect={this.onSelect}
        //                     >
        //                     {this.renderTreeNodes(treeData)}
        //                 </Tree>
        //             </div>
        //         </Card>
        //     )
        //     :'loading'
    }
}
export default connect(state=>({
    deptId:state.user.getIn(['personal','userInfo','sysUser','deptId']),
}))(NotSelectList)