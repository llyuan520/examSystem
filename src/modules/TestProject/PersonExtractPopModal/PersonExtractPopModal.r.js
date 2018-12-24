/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import {Button,Modal,Row,Col,Card,Tag} from 'antd';
//import {request,getFields} from 'utils'
import DescriptionList from 'components/DescriptionList'
import './styles.less';


const { Description } = DescriptionList;

class PersonExtractPopModal extends Component{
    static defaultProps={
        type:'edit',
        visible:true
    }
    state={
        initData:null,
        loading: true,
        updateKey:Date.now(),
        tags:[],
        currentTage:[],
    }
    refreshTable=()=>{
        this.setState({
            updateKey:Date.now(),
        })
    }

    toggleLoading = loading => this.setState({loading})
    // fetchReportById = (id)=>{
    //     this.toggleLoading(false)
    //     request.get(`/tax/preferences/find/${id}`)
    //         .then(({data})=>{
    //             this.toggleLoading(true)
    //             if(data.code===200){
    //                 this.setState({
    //                     initData:data.data
    //                 })
    //             }
    //         })
    //         .catch(err => {
    //             this.toggleLoading(true)
    //             message.error(err.message)
    //         });
    //}
    componentWillReceiveProps(nextProps){
        if(!nextProps.visible){
            /**
             * 关闭的时候清空表单
             * */
            this.setState({
                initData:null,
                tags:[],
                currentTage:[],
            },()=>{
                this.refreshTable()
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
            this.toggleLoading(false)
            this.setState({
                initData:nextProps.modalConfig.record
            },()=>{
                this.toggleLoading(false)
            })
        }
    }

    mounted=true

    componentWillUnmount() {
        this.mounted=null
    }
    
    componentDidMount() {
        this.toggleLoading(false)
    }

    handlePersonExtract=()=>{
        this.setState({
            tags:[
                { label:'张老师1', key:'1' },
                { label:'张老师2', key:'2' },
                { label:'张老师3', key:'3' },
                { label:'张老师4', key:'4' },
                { label:'张老师5', key:'5' },
            ]
        })
    }

    handleConfirm=()=>{
        this.setState({
            currentTage:[
                { label:'张老师1', key:'1' },
                { label:'张老师2', key:'2' },
                { label:'张老师3', key:'3' },
            ]
        })
    }

    render(){
        const props = this.props;
        const {initData,tags,currentTage,loading,updateKey} = this.state;
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
                title = '人员抽取';
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
                title={title}
                key={updateKey}
            >
                <Card loading={loading} key={updateKey} bordered={false}>
                    <DescriptionList size="small" style={{ marginBottom: 24 }} col={ 1 }>
                        <Description term="项目名称">{initData ? initData.mainName : '吉林大学考试安排'}</Description>
                        <Description term="监考总数">{initData ? initData.purchaseTaxNum : '48'}</Description>
                        {
                            currentTage.length > 1 && (
                                <Description term="已确认">
                                    {currentTage.map(item => (
                                        <Tag key={item.key} color="#2db7f5">{item.label}</Tag>
                                    ))}
                                </Description>
                            )
                        }
                    </DescriptionList>

                    <Button type="primary" onClick={this.handlePersonExtract}>人员抽取</Button>
                    
                    <div className="tags">
                        {tags.map(item => (
                            <Tag key={item.key}>{item.label}</Tag>
                        ))}
                    </div>
                    {
                        tags.length>1 && (
                            <Button type="primary" onClick={this.handleConfirm}>确认并短信通知</Button>
                        )
                    }
                </Card>

            </Modal>
        )
    }
}

export default PersonExtractPopModal
