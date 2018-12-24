import React, { Component } from 'react'
import { Modal, Button, message, Divider, } from 'antd'
import { SearchTable } from 'components'
import { request, parseJsonToParams } from 'utils'
import PopModal from './PopModal'
import PersonExtractPopModal from './PersonExtractPopModal' //人员抽取
import ExamRoomPopModal from './ExamRoomPopModal' //考场安排
// const pointerStyle = {
//     cursor: 'pointer',
//     color : '#1890ff',
//     margin: '0px 5px'
// }

const formItemStyle={
    labelCol:{
        span:7
    },
    wrapperCol:{
        span:17
    }
}
const apiList = [
    {text:'待处理',value:'10'},
    {text:'处理中',value:'20'},
    {text:'处理成功',value:'30'},
    {text:'异常',value:'40'},
];
const searchFields = [
    {
        label: '考试名称',
        fieldName: 'commodityName',
        formItemStyle,
        span:8,
        type: 'input',
    },
    {
        label: '考试类型',
        fieldName: 'purchaseTaxNum',
        formItemStyle,
        span:8,
        type: 'input',
    },
    {
        label: '状态',
        fieldName: 'subletBusiness',
        formItemStyle,
        span: 8,
        type: 'select',
        options: apiList
    },
    {
        label:'时间起止',
        fieldName:'deliveryDate',
        type:'rangePicker',
        span:8,
        formItemStyle,
    }
]
const columns = (context) => [
    {
        title:'项目名称',
        dataIndex:'mainName',
        //render:(text,record)=>(<span title='查看详情' style={pointerStyle} onClick={()=>context.showModal('view',record)}>{text}</span>),
    },
    {
        title:'所属考试信息',
        dataIndex:'purchaseTaxNum',
        width: 200,
    },
    {
        title:'监考人数',
        dataIndex:'commodityName',
        width: 200,
    },
    {
        title:'状态',
        dataIndex:'invoiceType',
        width: 200,
        render(text, record){
            apiList.map(o=>{
                if(o.value === record.apiKey){
                    text = o.label;
                }
                return null;
            });
            return text;
        }
    },
    {
        title: '操作',
        key: 'actions',
        dataIndex:'actions',
        width: 150,
        render: (text, record) => (
            <React.Fragment>
                <span 
                    style={{ color:'#f5222d', cursor:'pointer'}}
                    onClick={()=>context.showPersonExtractModal('view',record)}
                >
                    人员抽取
                </span>
                <Divider type="vertical" />
                <span 
                    style={{ color:'#1890ff', cursor:'pointer'}}
                    onClick={()=>context.showExamRoomModal('view',record)}
                >
                    考场安排
                </span>
            </React.Fragment>
            
        )
    }
];


class TestProject extends Component {
    state={
        visible:false,
        PersonExtractVisible:false,
        ExamRoomVisible:false,
        modalConfig:{
            type:''
        },
        PersonExtractModalConfig:{
            type:''
        },
        ExamRoomModalConfig:{
            type:''
        },
        tableKey:Date.now(),
    }
    refreshTable = ()=>{
        this.setState({
            tableKey:Date.now()
        })
    }
    toggleModalVisible=visible=>{
        this.setState({
            visible
        })
    }
    togglePersonExtractModalVisible=PersonExtractVisible=>{
        this.setState({
            PersonExtractVisible
        })
    }
    toggleExamRoomModalVisible=ExamRoomVisible=>{
        this.setState({
            ExamRoomVisible
        })
    }
    showModal=type=>{
        this.toggleModalVisible(true)
        this.setState({
            modalConfig:{
                type:type
            }
        })
    }
    showPersonExtractModal=type=>{
        this.togglePersonExtractModalVisible(true)
        this.setState({
            PersonExtractModalConfig:{
                type:type
            }
        })
    }
    showExamRoomModal=type=>{
        this.toggleExamRoomModalVisible(true)
        this.setState({
            ExamRoomModalConfig:{
                type:type
            }
        })
    }

    handleCancel=(values)=>{
        const modalRef = Modal.confirm({
            title: '友情提醒',
            content: '该数据撤销后将不可恢复，是否数据？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=>{
                modalRef && modalRef.destroy();
                request.delete(`${this.props.url}?${parseJsonToParams(values)}` )
                    .then(({data})=>{
                        this.toggleLoading(false)
                        if(data.code===200){
                            const {onSuccess} = this.props;
                            message.success('数据成功！');
                            this.toggleVisible(false);
                            onSuccess && onSuccess()
                        }else{
                            message.error(`数据失败:${data.msg}`)
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
    render() {
        const {visible,PersonExtractVisible,ExamRoomVisible,modalConfig,PersonExtractModalConfig,ExamRoomModalConfig,tableKey} = this.state;
        const dataSource = [{
            id: '1',
            mainName: '胡彦斌',
            commodityName: 32,
            invoiceNum:10,
            address: '西湖区湖底公园1号',
            invoiceType:20,
            invoiceCodeStart:'2018-12-16',
            invoiceCodeEnd:'2018-12-16',
            purchaseTaxNum:'10',
          }, {
            id: '2',
            mainName: '胡彦斌',
            commodityName: 22,
            invoiceNum:11,
            address: '西湖区湖底公园2号',
            invoiceType:30,
            invoiceCodeStart:'2018-12-16',
            invoiceCodeEnd:'2018-12-16',
            purchaseTaxNum:'20',
          }];
        return (
            <SearchTable
                searchOption={{
                    fields:searchFields,
                }}
                tableOption={{
                    key:tableKey,
                    columns:columns(this),
                    dataSource,
                    url:'/output/invoice/marry/unwanted/list',
                    // scroll:{
                    //     x:'150%'
                    // },
                    cardProps:{
                        title:'考试项目管理',
                    },
                    extra:(
                        <React.Fragment>
                            <Button type="primary" onClick={()=>this.showModal('add')} >新增考试项目</Button>
                        </React.Fragment>
                    ),
                }}
            >
                <PopModal 
                    refreshTable={this.refreshTable} 
                    visible={visible} 
                    modalConfig={modalConfig} 
                    toggleModalVisible={this.toggleModalVisible} 
                />
                <PersonExtractPopModal 
                    refreshTable={this.refreshTable} 
                    visible={PersonExtractVisible} 
                    modalConfig={PersonExtractModalConfig} 
                    toggleModalVisible={this.togglePersonExtractModalVisible} 
                />
                <ExamRoomPopModal 
                    refreshTable={this.refreshTable} 
                    visible={ExamRoomVisible} 
                    modalConfig={ExamRoomModalConfig} 
                    toggleModalVisible={this.toggleExamRoomModalVisible} 
                />
            </SearchTable>
        )
    }
}

export default TestProject
