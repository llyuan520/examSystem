import React,{Component} from 'react'
import { Card, Tree } from 'antd';
import _ from 'lodash';
import './selectList.less'

const { TreeNode } = Tree;

class SelectList extends Component{

    state={
        loading:false,
    }
    
    toggleLoading = loading => this.setState({loading})

    onSelect = (selectedKeys, info) => {
        const { checkeData } = this.props
        const newCheckeData = _.cloneDeep(checkeData)
        const id = info.node.props.dataRef.id;
        let newArry =  _.remove(newCheckeData,(o)=>{
            return o.id !== id
        })
        this.props.setCheckeData(newArry)
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children && item.children.length>0) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.name} key={item.id} {...item} dataRef={item} />;
    })

    render(){
        const { loading } = this.state;
        const { sum, checkeData, treeWrapperStyle } = this.props;
        return(
            <Card 
                title={`已选联系人： ${checkeData.length}/${sum}`}
                loading={loading}
                className="treeCard"
                headStyle={{
                    padding:'0 24px',
                    height:32,
                }}
                bodyStyle={{
                    padding:0,
                }}
            > 
                <div style={treeWrapperStyle}>
                    {
                        checkeData && checkeData.length>0 && (
                            <Tree 
                                onSelect={this.onSelect}
                            >
                                {this.renderTreeNodes(checkeData)}
                            </Tree>
                        )
                    }
                </div>
            </Card>
        )
    }
}
export default SelectList