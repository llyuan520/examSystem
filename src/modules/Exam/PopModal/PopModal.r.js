/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import {Button,Modal,Form,Row,Col,Spin,message} from 'antd';
import {request,getFields} from 'utils'
import moment from 'moment'
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
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = "YYYY-MM-DD HH:mm";
class PopModal extends Component{
    static defaultProps={
        type:'edit',
        visible:true
    }
    state={
        initData:null,
        loaded:false
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
                this.toggleLoaded(false)

                for(let key in values){
                    if(key === 'deliveryDate'){
                        if(Array.isArray( values[key] ) && values[key].length === 2 && moment.isMoment(values[key][0])){
                            //当元素为数组&&长度为2&&是moment对象,那么可以断定其是一个rangePicker
                            values[`${key}Start`] = values[key][0].format(dateTimeFormat);
                            values[`${key}End`] = values[key][1].format(dateTimeFormat);
                            delete values[key]
                        }
                    }
                    if(key === 'documentNum'){
                        if(Array.isArray( values[key] ) && values[key].length === 2 && moment.isMoment(values[key][0])){
                            //当元素为数组&&长度为2&&是moment对象,那么可以断定其是一个rangePicker
                            values[`${key}Start`] = values[key][0].format(dateFormat);
                            values[`${key}End`] = values[key][1].format(dateFormat);
                            delete values[key] 
                        }
                    }
                    if(moment.isMoment(values[key])){
                        //格式化一下时间 YYYY-MM类型
                        if(moment(values[key].format('YYYY-MM'),'YYYY-MM',true).isValid()){
                            values[key] = values[key].format('YYYY-MM');
                        }

                        /*if(moment(values[key].format('YYYY-MM-DD'),'YYYY-MM-DD',true).isValid()){
                         values[key] = values[key].format('YYYY-MM-DD');
                         }*/
                    }
                }
                console.log(values)
                
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
        request.put('/examinfo',data)
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
        request.post('/examinfo',data)
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
        const {initData,loaded} = this.state;
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
                                        label:'考试名称',
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
                                        label:'考试类型',
                                        fieldName:'purchaseTaxNum',
                                        type:'select',
                                        span:24,
                                        formItemStyle,
                                        componentProps:{
                                            disabled
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
                                        options:apiList
                                    },
                                    {
                                        label:'报名时间',
                                        fieldName:'deliveryDate',
                                        type:'rangePicker',
                                        span:24,
                                        formItemStyle,
                                        componentProps:{
                                            disabled,
                                            showTime:{ 
                                                format: 'HH:mm' 
                                            },
                                            format:dateTimeFormat
                                        },
                                        fieldDecoratorOptions:{
                                            initialValue:(initData && [moment(initData['invoiceCodeStart'], dateTimeFormat), moment(initData['invoiceCodeEnd'], dateTimeFormat)]) || undefined,
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请选择报名时间'
                                                }
                                            ]
                                        },
                                    },
                                    {
                                        label:'考试时间',
                                        fieldName:'documentNum',
                                        type:'rangePicker',
                                        span:24,
                                        formItemStyle,
                                        componentProps:{
                                            disabled
                                        },
                                        fieldDecoratorOptions:{
                                            initialValue:(initData && [moment(initData['invoiceCodeStart'], dateFormat), moment(initData['invoiceCodeEnd'], dateFormat)]) || undefined,
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请选择考试时间'
                                                }
                                            ]
                                        },
                                    },
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
