/**
 * Created by liuliyuan on 2018/5/30.
 */
import React from 'react';
import {Link} from 'react-router-dom'
import Exception from 'components/exception';

export default () => (
    <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
