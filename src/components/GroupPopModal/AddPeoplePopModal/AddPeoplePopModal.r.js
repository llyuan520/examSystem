import React, { Component } from 'react'
import { Modal, Row, Col, Button, Icon, Form, message, Tag } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { NotSelectList, SelectList } from '../SelectPersonnelPopModal'
import { request } from 'utils'

class AddPeoplePopModal extends Component{

    state={
        visible:false,
        loading:false,
        updateKey:Date.now(),
        treeData:[],
        checkeData:[],
        isShow:false,
    }

    componentDidMount(){
        this.getTreeParentNode()
    }

    getTreeParentNode = ()=>{
        const { deptId } = this.props
        request.get(`/admin/dept/tree`)
            .then(({data}) => {
                const result = [{
                    children: data[0].children,
                    parentId: data[0].parentId,
                    nickname:data[0].name,
                    userId:`d-${data[0].id}`,
                }]
                //if(data.code===0){
                    this.toggleLoading(false)
                    this.setState({
                        treeData:result
                    },()=>{
                        deptId && this.getfindDeptUsers(deptId)
                    })
                // }else{
                //     message.error(`删除失败:${data.msg}`)
                // }
                
            })
            .catch(err => {
                this.toggleLoading(false)
                message.error(err.msg)
            })
    }

    getfindDeptUsers=(deptId)=>{
        request.get(`/admin/user/findDeptUsers/${deptId}`)
            .then(({data}) => {
                if(data.code===0){
                    this.toggleLoading(false)
                    const result = [{
                        ...this.state.treeData[0],
                        children: data.data,
                        
                    }]
                    this.setState({
                        treeData:result
                    },()=>{
                        this.setState({
                            isShow:true,
                            updateKey:Date.now(),
                        })
                    })
                }else{
                    message.error(`删除失败:${data.msg}`)
                }
                
            })
            .catch(err => {
                this.toggleLoading(false)
                message.error(err.msg)
            })
    }
    
    toggleLoading = loading => this.setState({loading})
    toggleVisible = visible =>{
        this.setState({
            visible
        })
    }

    setCheckeData = checkeData =>{
        this.setState({
            checkeData
        })
    }

    handleDelete = (userId) =>{
        const tags = this.state.checkeData.filter(item => item.userId !== userId);
        this.setState({ 
            checkeData:tags
        });
    }

    handleSubmit = e => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.toggleLoading(false)
                console.log(values)
                this.toggleVisible(false);
            }
        });
    }

    render(){
        const { visible, loading, updateKey, isShow, treeData, checkeData} = this.state;
        const { style, form, buttonOptions, modalOptions } =this.props;
        const treeWrapperStyle = {
            height   : 400,//window.screen.availHeight-350,
            minHeight:'383px',
            overflowY: "scroll",
        }
        return(
            <span style={style}>
                <Button
                    size="small"
                    disabled={buttonOptions.disabled}
                    onClick={(e) => {
                        this.toggleVisible(true);
                        buttonOptions.onClick && buttonOptions.onClick();
                    }}
                >
                    {buttonOptions.icon && <Icon type={buttonOptions.icon} />}
                    {buttonOptions.text}
                </Button>

                <div className="tags">
                    {checkeData.map(item => (
                        <Tag closable key={item.userId} afterClose={() => this.handleDelete(item.userId)}>{item.nickname}</Tag>
                    ))}
                </div>
            
                <Modal
                    {...modalOptions}
                    centered
                    title={buttonOptions.text}
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visible}
                    confirmLoading={loading}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        form.resetFields();
                        this.setState({
                            treeData:[]
                        })
                        this.toggleVisible(false)
                    }}
                >
                    <Form style={{height:'100%'}}>
                        {
                            isShow && treeData.length>0 && (
                                <Row gutter={24}>
                                    <Col lg={12} md={24}>
                                        <NotSelectList key={updateKey} treeData={treeData} checkeData={checkeData} setCheckeData={this.setCheckeData.bind(this)} treeWrapperStyle={treeWrapperStyle} />
                                    </Col>
                                    <Col lg={12} md={24}>
                                        <SelectList key={updateKey} sum={ treeData[0].children && treeData[0].children.length } checkeData={checkeData} setCheckeData={this.setCheckeData.bind(this)} treeWrapperStyle={treeWrapperStyle} />
                                    </Col>
                                </Row>
                            )
                        }
                    </Form>
                </Modal>
            </span>
        )
    }
}

const enhance = compose(
    connect(state=>({
        deptId:state.user.getIn(['personal','userInfo','sysUser','deptId']),
    }),dispatch=>({
        //login:login(dispatch)
    })),
    Form.create()
)
export default enhance(AddPeoplePopModal);