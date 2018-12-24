/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import {Button,Modal,Form,Row,Col,Spin} from 'antd';
//import {request} from 'utils'
import { Link } from "react-router-dom";
import {AsyncTable} from 'components'
import DescriptionList from 'components/DescriptionList'
const { Description } = DescriptionList;

const columns = [{
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
    },
    {
        title: '预留人数（设置 / %）',
        dataIndex: 'taxMethod4',
        width:'150px',
    },
    {
        title: '操作',
        key: 'actions',
        dataIndex:'actions',
        fixed: 'right',
        width: 70,
        render: (text, record) => (
            <React.Fragment>
                <Link
                    title="查看考试详情"
                    target="_blank" 
                    to={{ pathname: `/web/testProject/${record.id}` }}
                >
                    考试详情
                </Link>
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

class ExamRoomPopModal extends Component{
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

    render(){
        const props = this.props;
        const {initData,loaded,updateKey} = this.state;
        let title='';
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
                        <DescriptionList size="small" style={{ marginBottom: 24 }} col={ 1 }>
                            <Description term="项目名称">{initData ? initData.mainName : '吉林大学考试安排'}</Description>
                            <Description term="监考总数">{initData ? initData.purchaseTaxNum : '48/48'}</Description>
                        </DescriptionList>
                        
                        <Row style={{marginTop: '10px'}}>
                            <AsyncTable 
                                url={undefined}
                                updateKey={updateKey}
                                tableProps={{
                                    dataSource:dataSource,
                                    rowKey:record=>record.id,
                                    size:'small',
                                    columns:columns,
                                    pagination:false,
                                    scroll:{
                                        //x:700,
                                        y:200,
                                    },
                                }} 
                            />
                        </Row>
                    </Spin>

            </Modal>
        )
    }
}

export default Form.create()(ExamRoomPopModal)
