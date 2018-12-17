/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import {Button,Modal,Form,Row,Col,Spin,message} from 'antd';
import {request,getFields} from 'utils'
const apiList = [
    {text:'待处理',value:'10'},
    {text:'处理中',value:'20'},
    {text:'处理成功',value:'30'},
    {text:'异常',value:'40'},
];
const formItemStyle = {
    labelCol:{
        span:7
    },
    wrapperCol:{
        span:14
    }
}
class PopModal extends Component{
    static defaultProps={
        type:'edit',
        visible:true
    }
    state={
        initData:null,
        loaded:false,
        task:[
            { label: '20', value: 20 },
            { label: '21', value: 21 },
            { label: '22', value: 22 },
            { label: '23', value: 23 },
        ]
    }

    toggleLoaded = loaded => this.setState({loaded})
    // fetchReportById = (id)=>{
    //     this.toggleLoaded(false)
    //     request.get(`/tax/preferences/find/${id}`)
    //         .then(({data})=>{
    //             this.toggleLoaded(true)
    //             if(data.code===200){
    //                 this.setState({
    //                     initData:data.data
    //                 })
    //             }
    //         })
    //         .catch(err => {
    //             this.toggleLoaded(true)
    //             message.error(err.message)
    //         });
    //}
    componentWillReceiveProps(nextProps){
        if(!nextProps.visible){
            /**
             * 关闭的时候清空表单
             * */
            nextProps.form.resetFields();
            this.setState({
                initData:null
            })
        }
        if(nextProps.modalConfig.type === 'add'){
            this.setState({
                loaded:true,
            })
        }
        if(this.props.visible !== nextProps.visible && !this.props.visible && nextProps.modalConfig.type !== 'add'){
            /**
             * 弹出的时候如果类型不为新增，则异步请求数据
             * */
            //this.fetchReportById(nextProps.modalConfig.id,nextProps)
            this.toggleLoaded(false)
            this.setState({
                initData:nextProps.modalConfig.record
            },()=>{
                this.toggleLoaded(true)
            })
        }
    }

    mounted=true

    componentWillUnmount() {
        this.mounted=null
    }
    
    handleSubmit = e => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const type = this.props.modalConfig.type;
                this.toggleLoading(false)
                console.log(values)
                this.toggleVisible(false);
                if(type==='edit'){
                    values.id=this.state.initData['id'];
                    //this.updateRecord(values)
                }else if(type==='add'){
                    //this.createRecord(values)
                }
            }
        });

    }

    updateRecord = data =>{
        request.put('/tax/preferences/update',data)
            .then(({data})=>{
                this.toggleLoaded(true)
                if(data.code===200){
                    const props = this.props;
                    message.success('更新成功!');
                    props.toggleModalVisible(false);
                    props.refreshTable()
                }else{
                    message.error(`更新失败:${data.msg}`)
                }
            })
            .catch(err => {
                this.toggleLoaded(true)
                message.error(err.message)
            })
    }

    createRecord = data =>{
        request.post('/tax/preferences/add',data)
            .then(({data})=>{
                this.toggleLoaded(true)
                if(data.code===200){
                    const props = this.props;
                    message.success('新增成功!');
                    props.toggleModalVisible(false);
                    props.refreshTable()
                }else{
                    message.error(`新增失败:${data.msg}`)
                }
            })
            .catch(err => {
                this.toggleLoaded(true)
                message.error(err.message)
            })
    }


    render(){
        const props = this.props;
        const {initData,loaded,task} = this.state;
        let title='';
        let disabled = false;
        const type = props.modalConfig.type;
        switch (type){
            case 'add':
                title = '新增';
                break;
            case 'modify':
                title = '修改';
                break;
            case 'view':
                title = '查看';
                disabled=true;
                break;
            default :
            //no default
        }
        return(
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                onCancel={()=>props.toggleModalVisible(false)}
                width={600}
                style={{
                    height:'316px',
                    maxWidth:'90%',
                    padding:0
                }}
                visible={props.visible}
                footer={
                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}>
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        </Col>
                    </Row>
                }
                title={title}>
                <Spin spinning={!loaded}>
                    <Form style={{height:'200px'}}>
                        <Row>
                            {
                                getFields(props.form,[
                                    {
                                        label:'考试科目名称',
                                        fieldName:'commodityName',
                                        type:'input',
                                        span:24,
                                        formItemStyle,
                                        componentProps:{
                                            disabled
                                        },
                                        fieldDecoratorOptions:{
                                            initialValue: initData && initData['commodityName'],
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请输入考试名称'
                                                }
                                            ]
                                        },
                                    },
                                    {
                                        label:'考试信息',
                                        fieldName:'purchaseTaxNum',
                                        type:'select',
                                        span:24,
                                        formItemStyle,
                                        options:apiList,
                                        componentProps:{
                                            disabled,
                                            onChange:e=>{
                                                this.setState({
                                                    task:[
                                                        { label: '30', value: 30 },
                                                        { label: '31', value: 31 },
                                                        { label: '32', value: 32 },
                                                        { label: '33', value: 33 },
                                                    ]
                                                })
                                            }
                                        },
                                        fieldDecoratorOptions:{
                                            initialValue:initData && initData['purchaseTaxNum'] ,
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请选择考试类型'
                                                }
                                            ]
                                        },
                                    },
                                    {
                                        label: '监考日期',
                                        fieldName: 'task',
                                        type: 'checkboxGroup',
                                        span: 24,
                                        formItemStyle,
                                        options: task,
                                        fieldDecoratorOptions: {
                                            initialValue: initData && initData['task'] ,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择监考日期'
                                                }
                                            ]
                                        }
                                    }
                                ])
                            }
                        </Row>
                    </Form>
                </Spin>

            </Modal>
        )
    }
}

export default Form.create()(PopModal)
