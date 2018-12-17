/**
 * Created by liuliyuan on 2018/12/17.
 */
import React,{Component} from 'react'
import { Modal,Row,Col,Button,Icon,Form } from 'antd';
import {getFields,formatMoment,regRules} from 'utils'

const formItemStyle = {
    labelCol:{
        span:5
    },
    wrapperCol:{
        span:19
    },
}
const FormItem = Form.Item;

class AddGroupPopModal extends Component{

    state={
        visible:false,
        loading:false,
        pullingWay:undefined,
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
                values = formatMoment(values);
                console.log(values)
                this.toggleVisible(false);
            }
        });
    }

    render(){
        const {visible,loading,pullingWay} = this.state;
        const {style,form,buttonOptions,modalOptions} =this.props;
        
        return(
            <span style={style}>
                <Button
                    size="small"
                    disabled={buttonOptions.disabled}
                    onClick={(e) => {
                        this.toggleVisible(true);
                        //buttonOptions.onClick && buttonOptions.onClick();
                    }}
                >
                    {buttonOptions.icon && <Icon type={buttonOptions.icon} />}
                    {buttonOptions.text}
                </Button>
            
                <Modal
                    {...modalOptions}
                    title={buttonOptions.text}
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visible}
                    confirmLoading={loading}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        form.resetFields();
                        this.setState({ pullingWay:undefined })
                        this.toggleVisible(false)
                    }}
                >
                    <Form style={{height:'100%'}}>
                            <Row>
                                {
                                    getFields(form,[
                                        {
                                            label:'组名',
                                            fieldName:'commodityName',
                                            type:'input',
                                            span:24,
                                            formItemStyle,
                                            fieldDecoratorOptions:{
                                                //initialValue: initData && initData['commodityName'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请输入考试名称'
                                                    }
                                                ]
                                            },
                                        },
                                        {
                                            label:'拉人方式',
                                            fieldName:'pullingWay',
                                            type:'radioGroup',
                                            span:24,
                                            formItemStyle,
                                            options:[
                                                {
                                                    label: '报名',
                                                    value: '1',
                                                },
                                                {
                                                    label: '选人',
                                                    value: '2',
                                                },
                                                {
                                                    label: '指定组长',
                                                    value: '3',
                                                }
                                            ],
                                            componentProps:{
                                                onChange:e=>{
                                                    e && e.preventDefault();
                                                    this.setState({
                                                        pullingWay:e.target.value
                                                    })
                                                }
                                            },
                                            fieldDecoratorOptions:{
                                                //initialValue:(initData && initData.confirmType) || undefined,
                                            }
                                        },
                                    ])
                                }
                            </Row>
                            { (pullingWay && pullingWay !== '1') && (
                                    <Row>
                                        <FormItem>
                                            <Row gutter={24}>
                                                <Col span={5}>
                                                    
                                                </Col>
                                                <Col span={19}>
                                                    <Button>添加人员</Button>
                                                </Col>
                                            </Row>
                                        </FormItem>
                                    </Row>
                                )
                            }
                            <Row>
                                {
                                    getFields(form,[
                                        {
                                            label:'备注',
                                            fieldName:'remark',
                                            type:'textArea',
                                            span:24,
                                            formItemStyle,
                                            fieldDecoratorOptions:{
                                                //initialValue:(initData && initData.remark ) || undefined,
                                                rules:[
                                                    {
                                                        max:regRules.textarea_length_2000.max, message: regRules.textarea_length_2000.message
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
export default Form.create()(AddGroupPopModal)
