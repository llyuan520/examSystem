import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {message,Upload,Button,Icon} from 'antd';
import {connect} from 'react-redux'


class AutoFileUpload extends Component{
    static propTypes={
        name:PropTypes.string,
        btnSize:PropTypes.string,
    }
    static defaultProps={
        title:'导入',
    }

    state={
        loading:false
    }

    onChange=info=>{
        if (info.file.status === 'uploading') {
            this.setState({loading:true})
        }
        if (info.file.status === 'done') {
            if(info.file.response.code===200){
                message.success(`${info.file.name} 上传成功`);
                this.props.onSuccess()
            }else {
                message.error(info.file.response.msg);
            }
            this.setState({loading:false})
        }
        if(info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
            this.setState({loading:false});
        }
    }
    //不设置accept的原因是设置之后osx下弹出文件选择会特别慢
    getUpLoadProps = props => ({
        name: 'files',
        action:`${window.baseURL+this.props.url}`,
        headers: {
            Authorization:this.props.token,
        },
        showUploadList:false
    });
    render(){
        let {loading} = this.state;
        const props = this.props;
        return(
            <Upload {...this.getUpLoadProps(props)} onChange={this.onChange.bind(this)}>
                    <Button disabled={props.disabled} loading={loading}>
                        <Icon type="upload" /> { props.title }
                    </Button>
            </Upload>
        )
    }
}

export default connect(state=>({
    token:state.user.get('token')
}))(AutoFileUpload)