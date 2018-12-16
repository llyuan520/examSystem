
/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :TODO: 可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, List, Icon } from 'antd'; //Spin, Alert
import './GroupList.less'

const { Meta } = Card;

class GroupList extends Component {

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
        const { dataSource } = this.props;
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
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
                                    <Icon type="close-circle" theme="filled" className="close" />
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