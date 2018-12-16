/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React, { Component } from 'react';

export default (importComponent, title) => {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                'mod': null
            };
        }
    
        async componentWillMount() {
            const {default: mod} = await importComponent();
            document.title = title;
            this.setState({
                mod: mod.default || mod
            });
        }
    
        render() {
            const C = this.state.mod;
            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}