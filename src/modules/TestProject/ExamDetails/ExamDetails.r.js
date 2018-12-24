/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react';
import { Card, List, Tag } from 'antd';
//import {request} from 'utils'
import DescriptionList from 'components/DescriptionList'
const { Description } = DescriptionList;

const data = [
    { 
        key:'1' ,
        label:'301教室',
        tags:[
            {
                key: '0',
                label: '很有想法的',
              },
              {
                key: '1',
                label: '专注设计',
              },
        ]
    },
    { 
        key:'2' ,
        label:'302教室',
        tags:[
            {
                key: '0',
                label: '大长腿0',
              },
              {
                key: '1',
                label: '川妹子1',
              },
        ]
    },
    { 
        key:'3' ,
        label:'303教室',
        tags:[
            {
                key: '0',
                label: '很有想0',
            },
            {
                key: '1',
                label: '很有想1',
            },
        ]
    },
    { 
        key:'4' ,
        label:'304教室',
        tags:[
            {
                key: '0',
                label: '很有想法0',
            },
            {
                key: '0',
                label: '很有想法1',
            },
        ]
    },
    { 
        key:'5' ,
        label:'305教室',
        tags:[
            {
                key: '0',
                label: '很有想法的0',
            },
            {
                key: '1',
                label: '很有想法的1',
            },
        ]
    },
]

class ExamDetails extends Component{
    state={
        initData:null,
        loading: true,
        updateKey:Date.now(),
        data:data,
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
    componentDidMount() {
        //const id = this.props.match.params.id;
        //this.fetchReportById(id);
        this.toggleLoading(false)
    }
    render(){
        const {loading, updateKey, initData, data} = this.state;
        return(
            <Card loading={loading} key={updateKey} bordered={false}>
                <DescriptionList size="small" style={{ marginBottom: 24 }} col={ 1 }>
                    <Description term="考试科目名称">{initData ? initData.mainName : '吉林大学考试安排'}</Description>
                    <Description term="考试日期">{initData ? initData.purchaseTaxNum : '2018-12-24'}</Description>
                    <Description term="考试时间">{initData ? initData.purchaseTaxNum : '09:00-11:30'}</Description>
                    <Description term="考场人数">{initData ? initData.purchaseTaxNum : '16'}</Description>
                    <Description term="监考人数">{initData ? initData.purchaseTaxNum : '48'}</Description>
                </DescriptionList>
                
                <List
                    rowKey="id"
                    grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <Card hoverable>
                            <div className="tags">
                                {item.tags.map(item => (
                                    <Tag key={item.key}>{item.label}</Tag>
                                ))}
                            </div>
                        </Card>
                        <h3 style={{textAlign:'center' }}>{item.label}</h3>
                    </List.Item>
                    )}
                />

            </Card>
        )
    }
}

export default ExamDetails
