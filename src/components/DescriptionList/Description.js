import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import responsive from './responsive';
import './index.less'

const Description = ({ term, column, className, children, ...restProps }) => {
  return (
    <Col className={className} {...responsive[column]} {...restProps}>
      {term && <div className='term'>{term}</div>}
      {children !== null &&
        children !== undefined && <div className='detail'>{children}</div>}
    </Col>
  );
};

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
