/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Form,Row,message,Button,Icon} from 'antd'
import {request,getFields} from 'utils'
import moment from 'moment'

class FileUndoImportModal extends Component{
    static propTypes={
        onSuccess:PropTypes.func,
        disabled:PropTypes.bool,
    }
    static defaultProps = {
        searchFields:(props)=>{
            let {initialValue={}} = props,
                monthFieldName = props.monthFieldName || 'taxMonth';
            return [
                {
                    label:'纳税主体',
                    fieldName:'mainId',
                    type:'taxMain',
                    span:20,
                    formItemStyle:{
                        labelCol:{
                            span:8
                        },
                        wrapperCol:{
                            span:16
                        }
                    },
                    componentProps:{
                        disabled: initialValue['mainId'] ? true : false,
                    },
                    fieldDecoratorOptions:{
                        initialValue: initialValue['mainId'] || undefined,
                        rules:[
                            {
                                required:true,
                                message:'请选择纳税主体'
                            }
                        ]
                    }
                },
                {
                    label:'认证月份',
                    fieldName:monthFieldName,
                    type:'monthPicker',
                    componentProps:{
                        format:'YYYY-MM',
                        disabled: initialValue[monthFieldName] && moment(initialValue[monthFieldName]) ? true : false,
                    },
                    span:20,
                    formItemStyle:{
                        labelCol:{
                            span:8
                        },
                        wrapperCol:{
                            span:16
                        }
                    },
                    fieldDecoratorOptions:{
                        initialValue:initialValue[monthFieldName] && moment(initialValue[monthFieldName]),
                        rules:[
                            {
                                required:true,
                                message:'请选择认证月份'
                            }
                        ]
                    }
                }
            ]
        }
    }
    state={
        visible:false,
        loading:false,
    }
    toggleLoading = loading =>{
        this.setState({
            loading
        })
    }
    toggleVisible = visible =>{
        if(visible){
            this.props.form.resetFields()
        }
        this.setState({
            visible
        })
    }

    handleSubmit = e => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                for(let key in values){
                    if(moment.isMoment(values[key])){
                        //格式化一下时间 YYYY-MM类型
                        if(moment(values[key].format('YYYY-MM'),'YYYY-MM',true).isValid()){
                            values[key] = values[key].format('YYYY-MM');
                        }
                    }
                }

                const modalRef = Modal.confirm({
                    title: '友情提醒',
                    content: '该撤销后将不可恢复，是否撤销？',
                    okText: '确定',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk:()=>{
                        modalRef && modalRef.destroy();
                        this.toggleLoading(true)
                        request.post(this.props.url,values)
                            .then(({data})=>{
                                this.toggleLoading(false)
                                if(data.code===200){
                                    const {onSuccess} = this.props;
                                    message.success('撤销成功！', 4)
                                    this.toggleVisible(false);
                                    onSuccess && onSuccess()
                                }else{
                                    message.error(`撤销失败:${data.msg}`)
                                }
                            }).catch(err=>{
                                message.error(err.message)
                                this.toggleVisible(false);
                        })
                    },
                    onCancel() {
                        modalRef.destroy()
                    },
                });

            }
        })
    }
    render(){
        const props = this.props;
        const {visible,loading} = this.state;
        const { fields } = this.props
        return(
            <span style={props.style}>
                <Button  disabled={props.disabled} onClick={()=>this.toggleVisible(true)}>
                    <Icon type="rollback" />
                    {props.title}
                </Button>
                <Modal title={props.title} visible={visible} confirmLoading={loading} onOk={this.handleSubmit} onCancel={()=>this.toggleVisible(false)} maskClosable={false} destroyOnClose={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            {
                                fields? getFields(this.props.form,props.searchFields(props).concat(fields)): getFields(this.props.form,props.searchFields(props))
                            }
                        </Row>
                    </Form>
                </Modal>
            </span>
        )
    }
}

export default Form.create()(FileUndoImportModal)