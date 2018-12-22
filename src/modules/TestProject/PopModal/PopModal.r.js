/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import {Button,Modal,Form,Row,Col,Spin,message,Card} from 'antd';
import {request,getFields} from 'utils'
import {AutoFileUpload,AsyncTable} from 'components'
import { NumericInputCell } from 'components/EditableCell'

const FormItem = Form.Item;

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

const columns = (context,getFieldDecorator) => [{
        title: '招考单位',
        dataIndex: 'itemName',
        width:'200px',
    },
    {
        title: '科目名称',
        dataIndex: 'itemNum',
        width:'100px',
    },
    {
        title: '考试日期',
        dataIndex: 'itemNum1',
        width:'100px',
    },
    {
        title: '考试时间',
        dataIndex: 'taxMethod1',
        width:'100px',
    },
    {
        title: '考场数',
        dataIndex: 'taxMethod2',
        width:'100px',
    },
    {
        title: '每考场监考数（设置）',
        dataIndex: 'taxMethod3',
        width:'150px',
        render:(text,record)=>{
            return (
                <NumericInputCell
                    fieldName={`list[${record.id}].taxMethod3`}
                    initialValue={text}
                    getFieldDecorator={getFieldDecorator}
                />
            )
        },
    },
    {
        title: '预留人数（设置 / %）',
        dataIndex: 'taxMethod4',
        width:'150px',
        render:(text,record)=>{
            return (
                <NumericInputCell
                    fieldName={`list[${record.id}].taxMethod4`}
                    initialValue={text}
                    getFieldDecorator={getFieldDecorator}
                />
            )
                
        },
    },
    {
        title: '操作',
        key: 'actions',
        dataIndex:'actions',
        fixed: 'right',
        width: 70,
        render: (text, record) => (
            <React.Fragment>
                <span 
                    style={{ color:'#f5222d', cursor:'pointer'}}
                    onClick={()=>context.handleDelete(record.id)}
                >
                    删除
                </span>
            </React.Fragment>
            
        )
    }
];

const dataSource = [ {
    id : '1076368399172296707',
    itemName : '1057118130383618049',
    itemNum : 'BSBGY-ZSJ-01J-109',
    itemNum1 : 'BSBGY-ZSJ-01J-109',
    taxMethod : '33333.00',
    taxMethod1 : '33333',
    taxMethod2 : '33333',
    taxMethod3 : '33333',
    taxMethod4 : '33333',
  }, {
    id : '1076368399172296706',
    itemName : '1057118130383618049',
    itemNum : 'BSBGY-ZSJ-01J-108',
    itemNum1 : 'BSBGY-ZSJ-01J-109',
    taxMethod : '1333.00',
    taxMethod1 : '33333',
    taxMethod2 : '33333',
    taxMethod3 : '33333',
    taxMethod4 : '33333',
  }, {
    id : '1076368399172296705',
    itemName : '1057118130383618049',
    itemNum : 'BSBGY-ZSJ-01J-107',
    itemNum1 : 'BSBGY-ZSJ-01J-109',
    taxMethod : '1000000.00',
    taxMethod1 : '33333',
    taxMethod2 : '33333',
    taxMethod3 : '33333',
    taxMethod4 : '33333',
  } ]

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
        ],

        updateKey:Date.now(),
        showList:true,
    }
    refreshTable=()=>{
        this.setState({
            updateKey:Date.now(),
        })
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

    handleDelete=(values)=>{
        const modalRef = Modal.confirm({
            title: '友情提醒',
            content: '该数据删除后将不可恢复，是否删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=>{
                modalRef && modalRef.destroy();
                request.delete(`${this.props.url}` )
                    .then(({data})=>{
                        this.toggleLoading(false)
                        if(data.code===200){
                            message.success('删除成功！');
                            this.toggleVisible(false);
                            this.refreshTable()
                        }else{
                            message.error(`删除失败:${data.msg}`)
                        }
                    }).catch(err=>{
                    message.error(err.message)
                    this.toggleLoading(false)
                })
            },
            onCancel() {
                modalRef.destroy()
            },
        });
    }

    render(){
        const props = this.props;
        const {initData,loaded,showList,updateKey} = this.state;
        const { getFieldDecorator } = props.form;
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
                width={1000}
                //height={450}
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
                    <Form style={{height:'auto'}}>
                        <Row>
                            {
                                getFields(props.form,[
                                    {
                                        label:'项目名称',
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
                                                    message:'请选择考试信息'
                                                }
                                            ]
                                        },
                                    },
                                ])
                            }
                        </Row>
                        <Row>
                            <FormItem label="导入考试" 
                                labelCol={{
                                    span:7
                                }}
                                wrapperCol={ {
                                    span:14
                                }}
                            >
                                {
                                    getFieldDecorator('files',{
                                        rules: [{
                                            required: true, message: '请上传考试文件!'
                                        }],
                                        //initialValue:record.files
                                    })(
                                        <AutoFileUpload 
                                            title={`选择文件`}
                                            url={`project/upload`}
                                            disabled={disabled}
                                            onSuccess={()=>{
                                                this.setState({
                                                    showList:true
                                                },()=>{
                                                    this.refreshTable()
                                                })
                                            }}
                                        />
                                    )
                                }
                            </FormItem>
                        </Row>
                        {
                            showList && (
                                <Row style={{marginTop: '10px'}}>
                                    <AsyncTable 
                                        url={undefined}
                                        updateKey={updateKey}
                                        tableProps={{
                                            dataSource:dataSource,
                                            rowKey:record=>record.id,
                                            size:'small',
                                            columns:columns(this,getFieldDecorator),
                                            pagination:false,
                                            scroll:{
                                                //x:700,
                                                y:200,
                                            },
                                        }} 
                                    />
                                </Row>
                            )
                        }
                    </Form>
                </Spin>

            </Modal>
        )
    }
}

export default Form.create()(PopModal)
