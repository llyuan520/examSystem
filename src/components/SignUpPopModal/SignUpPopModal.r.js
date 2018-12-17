/**
 * Created by liuliyuan on 2018/12/17.
 */
import React,{Component} from 'react'
import { Modal,Row,Form } from 'antd';
import {getFields} from 'utils'
import ExamInfor from 'components/ExamInfor'

const formItemStyle = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:19
    },
}

class SignUpPopModal extends Component{

    state={
        visible:false,
        loading:false,
    }
    
    toggleLoading = loading => this.setState({loading})
    toggleVisible = visible =>{
        this.setState({
            visible
        })
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
        const { visible, loading, } = this.state;
        const { style, title, record, form, modalOptions } =this.props;
        
        return(
            <span style={style}>
                <span 
                    style={{ color:'#1890ff', cursor:'pointer'}}
                    onClick={()=>{
                        this.toggleVisible(true);
                        //onClick && onClick()
                    }}
                >
                    {title}
                </span>
            
                <Modal
                    {...modalOptions}
                    title={title}
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visible}
                    confirmLoading={loading}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        form.resetFields();
                        this.toggleVisible(false)
                    }}
                >
                    <ExamInfor record={record} col={1} />
                    <Form style={{height:'auto'}}>
                            <Row>
                                {
                                    getFields(form,[
                                        {
                                            label: '监考日期',
                                            fieldName: 'task',
                                            type: 'checkboxGroup',
                                            span: 24,
                                            formItemStyle,
                                            options: [
                                                { label: '20', value: 20 },
                                                { label: '21', value: 21 },
                                                { label: '22', value: 22 },
                                                { label: '23', value: 23 },
                                            ],
                                            fieldDecoratorOptions: {
                                                initialValue: [20,21,22,23],
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
                </Modal>
            </span>
        )
    }
}

export default Form.create()(SignUpPopModal)
