import React, { Component } from 'react';
import { Tree, Spin, message, Button, Divider, Modal } from 'antd';
import PropTypes from 'prop-types'
import { request } from 'utils'
import AddGroupPopModal from 'components/GroupPopModal/AddGroupPopModal'

const TreeNode = Tree.TreeNode;
class TreeList extends Component {
    static propTypes={
        updateKey:PropTypes.number,
        //url:PropTypes.string.isRequired,
        onSuccess:PropTypes.func,
        onSuccessRefresh:PropTypes.func,
    }
    static defaultProps={
        updateKey:Date.now(),
        showLine:false,
        isLoadDate:true,
    }

    constructor(props){
        super()
        this.state = {
            /*expandedKeys: [],
            autoExpandParent: true,
            selectedKeys: [],*/
    
            treeData:props.treeData || [],
            //selectedNodes:undefined,
            editClassKey:Date.now()+'1',
            eidtLoading:false,
        }
    }

    
    // onLoadData = (treeNode) => {
    //     return new Promise((resolve) => {
    //         if (treeNode.props.children) {
    //             resolve();
    //             return;
    //         }
    //         request.get(this.props.url,{
    //             params:{id:treeNode.props.dataRef.id}
    //         }).then(({data}) => {
    //             if(data.code===200) {
    //                 //setTimeout(() => {
    //                     treeNode.props.dataRef.children = data.data;
    //                     this.setState({
    //                         treeData: [...this.state.treeData]
    //                     });
    //                     resolve();
    //                // }, 1000);
    //             }
    //         })
    //         .catch(err => {
    //             message.error(err.message)
    //         });;

    //     });
    // }

    renderTreeNodes = data => {
        const { isShow } = this.props;
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode 
                        selectable={false} //TODO必须要设置，要不然每次点击title里面的其它事件都会被触发到
                        key={item.id} 
                        dataRef={item}
                        title={
                            <React.Fragment>
                                {item.name}
                                {
                                    isShow && (
                                        <React.Fragment>
                                            <Divider type="vertical" />
                                            <AddGroupPopModal
                                                buttonOptions={{
                                                    text:'添加分组',
                                                }}
                                            />
                                        </React.Fragment>
                                    )
                                }
                            </React.Fragment>
                        }

                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode 
                    selectable={false}  //TODO必须要设置，要不然每次点击title里面的其它事件都会被触发到
                    key={item.id} 
                    {...item} 
                    dataRef={item}
                    title={
                        <React.Fragment>
                            {item.name}
                            {
                                isShow && (
                                    <React.Fragment>
                                        <Divider type="vertical" />
                                        <Button size="small">添加人员</Button>
                                        <Divider type="vertical" />
                                        <Button size="small">截至</Button>
                                        <Divider type="vertical" />
                                        <Button size="small">打印监考证</Button>
                                        <Divider type="vertical" />
                                        <Button 
                                            type="danger" 
                                            ghost 
                                            size="small"
                                            onClick={()=>this.handleDelete(item.id)}
                                        >
                                            删除
                                        </Button>
                                    </React.Fragment>
                                )
                            }
                        </React.Fragment>
                    }
                />
            )
        });
    }

    handleDelete=(values)=>{
        const modalRef = Modal.confirm({
            title: '友情提醒',
            content: '该数据删除后将不可恢复，是否删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=>{
                modalRef && modalRef.destroy();
                // request.delete(`${this.props.url}?${parseJsonToParams(values)}` )
                //     .then(({data})=>{
                //         this.toggleLoading(false)
                //         if(data.code===200){
                //             const {onSuccess} = this.props;
                //             message.success('删除成功！');
                //             this.toggleVisible(false);
                //             onSuccess && onSuccess()
                //         }else{
                //             message.error(`删除失败:${data.msg}`)
                //         }
                //     }).catch(err=>{
                //     message.error(err.message)
                //     this.toggleLoading(false)
                // })
            },
            onCancel() {
                modalRef.destroy()
            },
        });
    }
    
    fetchTree = (props) => {
        this.mounted && this.setState({ eidtLoading: true });
        request.get(this.props.url,{
        }).then(({data}) => {
            if(data.code===200) {
                this.mounted && this.setState({
                    treeData: [...data.data],
                    //expandedKeys: [`${data.data[0].id}`],
                    //autoExpandParent: false,
                    //selectedKeys: props && props.id && [`${props.id}`],
                    eidtLoading: false,
                })
            }
        })
        .catch(err => {
            this.mounted && this.setState({ eidtLoading: false });
            message.error(err.message)
        });
    }
    onSelect = ( selectedKeys, e ) => {
        console.log(selectedKeys,e)
    }
    
    //onSelect = (selectedKeys, info) => {
        //const selectedNodes = info.node.props.dataRef;
        /*this.setState({
            selectedKeys,
            selectedNodes:selectedNodes,
        });*/
        /**
         * 成功之后回调，返回参数和数据
         * */
        //this.props.treeOption.onSuccess && this.props.treeOption.onSuccess(selectedKeys,selectedNodes);
    //}
    /*onExpand = (expandedKeys) => {
        //console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }*/

    // componentDidMount(){
    //     this.fetchTree()
    // }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    componentWillReceiveProps(nextProps){
        if(this.props.updateKey!==nextProps.updateKey){
            //this.fetchTree(nextProps)
            this.setState({
                treeData: nextProps.treeData,
                //expandedKeys: [`${data.data[0].id}`],
                //autoExpandParent: false,
                //selectedKeys: props && props.id && [`${props.id}`],
                eidtLoading: false,
            })
        }
    }

    render() {
        const props = this.props;
        const {treeData} = this.state;  //,selectedKeys,expandedKeys,autoExpandParent
        return (
            <Spin spinning={this.state.eidtLoading}>
                {/* <div style={{overflow:'auto',height: "auto"}}> */}

                    <Tree
                        key={props.updateKey}
                        /*onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        selectedKeys={selectedKeys}
                        */
                        //showLine={props.showLine}
                        //loadData={props.isLoadDate && this.onLoadData}
                        onSelect={this.onSelect}
                    >
                        {this.renderTreeNodes(treeData)}
                    </Tree>

                {/* </div> */}
            </Spin>

        );
    }
}

export default  TreeList