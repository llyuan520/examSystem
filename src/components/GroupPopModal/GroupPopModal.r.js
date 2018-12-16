/**
 * Created by liuliyuan on 2018/12/16.
 */
import React,{Component} from 'react'
import {Drawer,Row,Col,Card} from 'antd';
//import PropTypes from 'prop-types'
//import {request,getFields} from 'utils'
import GroupList  from './GroupList.r'
import TreeList from './TreeList.r'

const dataSource = [
    {
        "path": "/web/vatManage/entryManag/invoiceCollection",
        "name": "进项发票采集进项发票采集进项发票采集",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#73CF2B"
        },
        "authorityInfo": [
            "1491002",
            "1491005",
            "1495002",
            "1491007",
            "1491008",
            "1495000",
            "1491010",
            "1491011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/fixedAssetCollection",
        "name": "不动产信息采集",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#73CF2B"
        },
        "authorityInfo": [
            "1511002",
            "1511007",
            "1511010",
            "1511011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/inputTaxDetails",
        "name": "进项税额明细台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#307173"
        },
        "authorityInfo": [
            "1381002",
            "1381007",
            "1381008",
            "1381009",
            "1381004",
            "1381010",
            "1381011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/otherDeductionVoucher",
        "name": "其他扣税凭证其他扣税凭证其他扣税凭证",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#4DC1F0"
        },
        "authorityInfo": [
            "1521002",
            "1521010",
            "1521011",
            "1521009",
            "1521007"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/otherBusinessInputTaxRollOut",
        "name": "进项税额转出台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1401002",
            "1401003",
            "1401007",
            "1401009",
            "1401010",
            "1401011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/fixedAssetsInvoice",
        "name": "不动产进项发票台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1241002",
            "1241007",
            "1241010",
            "1241009",
            "1241011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/realEstateInputTaxCredit",
        "name": "不动产进项税额抵扣台账不动产进项税额抵扣台账不动产进项税额抵扣台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1251002",
            "1251007",
            "1251009",
            "1251010",
            "1251011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/selfContainedProductAssociation",
        "name": "自持类产品关联进项发票",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#2E8A57"
        },
        "authorityInfo": [
            "2051002",
            "2051009",
            "2055003",
            "2051007",
            "2055002",
            "2051010",
            "2051011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/invoiceCollection",
        "name": "进项发票采集进项发票采集进项发票采集",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#73CF2B"
        },
        "authorityInfo": [
            "1491002",
            "1491005",
            "1495002",
            "1491007",
            "1491008",
            "1495000",
            "1491010",
            "1491011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/fixedAssetCollection",
        "name": "不动产信息采集",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#73CF2B"
        },
        "authorityInfo": [
            "1511002",
            "1511007",
            "1511010",
            "1511011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/inputTaxDetails",
        "name": "进项税额明细台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#307173"
        },
        "authorityInfo": [
            "1381002",
            "1381007",
            "1381008",
            "1381009",
            "1381004",
            "1381010",
            "1381011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/otherDeductionVoucher",
        "name": "其他扣税凭证其他扣税凭证其他扣税凭证",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#4DC1F0"
        },
        "authorityInfo": [
            "1521002",
            "1521010",
            "1521011",
            "1521009",
            "1521007"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/otherBusinessInputTaxRollOut",
        "name": "进项税额转出台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1401002",
            "1401003",
            "1401007",
            "1401009",
            "1401010",
            "1401011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/fixedAssetsInvoice",
        "name": "不动产进项发票台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1241002",
            "1241007",
            "1241010",
            "1241009",
            "1241011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/realEstateInputTaxCredit",
        "name": "不动产进项税额抵扣台账不动产进项税额抵扣台账不动产进项税额抵扣台账",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#3B4A83"
        },
        "authorityInfo": [
            "1251002",
            "1251007",
            "1251009",
            "1251010",
            "1251011"
        ],
        "exact": true
    },
    {
        "path": "/web/vatManage/entryManag/selfContainedProductAssociation",
        "name": "自持类产品关联进项发票",
        "icon": {
            "url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "backgroundColor": "#2E8A57"
        },
        "authorityInfo": [
            "2051002",
            "2051009",
            "2055003",
            "2051007",
            "2055002",
            "2051010",
            "2051011"
        ],
        "exact": true
    },
    {
        "exact": true,
        "path": "/web/vatManage/entryManag",
        "redirect": true,
        "to": "/web/vatManage/entryManag/invoiceCollection"
    }
]

const treeData = [{
    name: '0-0',
    id: '0-0',
    isLeaf : false,
    children: [
        { name: '0-0-0', id: '0-0-0',isLeaf : true, },
        { name: '0-0-1-0', id: '0-0-1-0',isLeaf : true, },
        { name: '0-0-1-1', id: '0-0-1-1',isLeaf : true, },
        { name: '0-0-1-2', id: '0-0-1-2',isLeaf : true, },
        { name: '0-0-1-0', id: '0-0-1-3',isLeaf : true, },
        { name: '0-0-1-1', id: '0-0-1-4',isLeaf : true, },
        { name: '0-0-1-2', id: '0-0-1-5',isLeaf : true, },
        { name: '0-0-1-0', id: '0-0-1-6',isLeaf : true, },
        { name: '0-0-1-1', id: '0-0-1-7',isLeaf : true, },
        { name: '0-0-1-2', id: '0-0-1-8',isLeaf : true, },
    ],
  }];
class GroupPopModal extends Component{

    state={
        visible:false,
    }
    
    toggleVisible = visible =>{
        this.setState({
            visible
        })
    }

    render(){
        const {style,onClick,drawerOptions,treeCardOption} =this.props;
        const {visible} = this.state;
        const bodyStyle = {
            padding: '12px',
            overflowY:'auto',
            height:window.screen.availHeight-210
        }
        return(
            <span style={style}>
                <span 
                    style={{ color:'#f5222d', cursor:'pointer'}}
                    onClick={()=>{
                        this.toggleVisible(true);
                        onClick && onClick()
                    }}
                >
                    分组
                </span>

                <Drawer
                    title     = '分组'
                    placement = "top"
                    //closable={true}
                    visible = {visible}
                    width   = {"100%"}
                    height  = {"100%"}
                    //getContainer={document.getElementsByClassName("ant-layout-content")[0]}
                    onClose        = {()=>this.toggleVisible(false)}
                    maskClosable   = {false}
                    destroyOnClose = {true}
                    style          = {{
                    height   : "calc(100% - 55px)",
                    minHeight: "100vh"
                    }}
                    {...drawerOptions}
                >
                    <Row gutter={24}>
                        <Col lg={7} md={24}>
                            <Card
                                extra = {treeCardOption && (treeCardOption.extra || null)}
                                //style={{marginTop:10}}
                                //{...treeCardOption.cardProps}
                                bodyStyle={bodyStyle}
                            >
                                <TreeList treeData={treeData} />
                            </Card>
                        </Col>
                        <Col lg={17} md={24}>
                            <GroupList 
                                dataSource={dataSource}
                             />
                        </Col>
                    </Row>
                </Drawer>
            </span>
        )
    }
}
export default GroupPopModal
