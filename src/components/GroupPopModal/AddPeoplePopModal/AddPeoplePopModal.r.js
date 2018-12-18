import React,{Component} from 'react'
import { Modal,Row,Col,Button,Icon,Form } from 'antd';
import { NotSelectList, SelectList } from '../SelectPersonnelPopModal'

let list = (len) =>{
    const children = [];
    for (let i = 0; i < len; i++) {
        children.push({ 
            "id" : `id${i+1}`,
            "name" : `天津区域${i+1}`,
            "code" : `BQ${i+1}`,
            "parentId" : "1",
            "isLeaf" : true,
         });
    }
    return children
}

const treeData = [ {
    "id" : "1",
    "name" : "碧桂园集团",
    "code" : "ALL",
    "parentId" : "0",
    "isLeaf" : false,
    "children" : list(50)
}] 
class AddPeoplePopModal extends Component{

    state={
        visible:false,
        loading:false,
        checkeData:[]
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
        const { visible, loading, checkeData} = this.state;
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
                        this.toggleVisible(false)
                    }}
                >
                    <Form style={{height:'100%'}}>
                        <Row gutter={24}>
                            <Col lg={12} md={24}>
                                <NotSelectList treeData={treeData} checkeData={checkeData} setCheckeData={this.setCheckeData.bind(this)} treeWrapperStyle={treeWrapperStyle} />
                            </Col>
                            <Col lg={12} md={24}>
                                <SelectList sum={ treeData[0].children.length } checkeData={checkeData} setCheckeData={this.setCheckeData.bind(this)} treeWrapperStyle={treeWrapperStyle} />
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </span>
        )
    }
}
export default Form.create()(AddPeoplePopModal)