
/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :TODO: 可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, List, Modal, Icon } from 'antd'; //Spin, Alert
import './GroupList.less'

const { Meta } = Card;

class GroupList extends Component {

    handleDelete=(values)=>{
        const modalRef = Modal.confirm({
            title: '友情提醒',
            content: '该数据删除后将不可恢复，是否删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=>{
                modalRef && modalRef.destroy();
                // request.delete(`${this.props.url}?${parseJsonToParams(values)}` )
                //     .then(({data})=>{
                //         this.toggleLoading(false)
                //         if(data.code===200){
                //             const {onSuccess} = this.props;
                //             message.success('删除成功！');
                //             this.toggleVisible(false);
                //             onSuccess && onSuccess()
                //         }else{
                //             message.error(`删除失败:${data.msg}`)
                //         }
                //     }).catch(err=>{
                //     message.error(err.message)
                //     this.toggleLoading(false)
                // })
            },
            onCancel() {
                modalRef.destroy()
            },
        });
    }
    
    composeNav=(routes)=>{
        return routes.map(item=>{
            if(item && !item.to && item.icon){
                const component = {
                    ...item,
                    path:item.path,
                    name:item.name,
                    icon:item.icon  //|| {url:'/assets/routes_avatar/mainTax.svg', backgroundColor:'#61C5C3'} `icon_${i}`,
                }
                return component
            }
            return null;

        }).filter(item=>item);
    }

    render() {
        const { isShow, dataSource } = this.props;
        //Card loading={currentUserLoading}
        const data = [
            {
              title: 'Ant Design Title 1',
            },
          ];
        return (
            <React.Fragment>
                <Card
                               
                    bodyStyle={{
                        padding:0,
                    }}
                >
                    <div 
                        style={{
                            padding:'0 32px 12px 12px',
                        }}
                    >
                        {/* <Alert
                            message="Info Text"
                            description="Info Description Info Description Info Description Info Description"
                            type="info"
                        /> */}
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">所在组：{item.title}</a>}
                                description={`责任说明：Ant Design, a design language for background applications, is refined by Ant UED Team`}
                                />
                            </List.Item>
                            )}
                        />

                    </div>
                    <Card
                        className="tabsCard"
                        bordered={false}
                        //tabList={operationTabList}
                        //activeTabKey={location.pathname.replace(`${match.path}/`, '')}
                        onTabChange={this.onTabChange}
                        //loading={listLoading}
                        bodyStyle={{
                            padding:'12px 32px 12px 12px',
                            overflowY:'auto',
                            height:window.screen.availHeight-292
                        }}
                    >
                        <List
                            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                            dataSource={this.composeNav(dataSource)}
                            renderItem={item => (
                                <List.Item 
                                    className="listMain"
                                    // onClick={()=>{
                                    //     this.handlerClick(item)
                                    // }} 
                                >
                                    {
                                        isShow && <Icon type="close-circle" className="close" onClick={()=>this.handleDelete(item.id)} /> 
                                    }
                                    
                                    <Link to={'###'}>
                                        <Card className="nav-card">
                                            <Meta
                                                avatar={<Avatar className="IconImg" src={item.icon.url}
                                                            /* style={{
                                                        background:item.icon.backgroundColor
                                                    }}*/
                                                />}
                                                //title={item.name}
                                                description={<span style={{color:'#666'}}>{item.name}</span>}
                                            />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Card>
            </React.Fragment>
        )
    }
}

export default GroupList