import React from 'react';
import PropTypes from 'prop-types';
import DescriptionList from 'components/DescriptionList'
const { Description } = DescriptionList;

const ExamInfor = ({ record, layout, col }) => {
  return (
    <DescriptionList size="small" style={{ marginBottom: 24 }}  layout={ layout } col={ col }>
        <Description term="考试名称">{record.mainName}</Description>
        <Description term="考试类型">{record.purchaseTaxNum}</Description>
        <Description term="报名时间">{record.invoiceCodeStart} 至 {record.invoiceCodeEnd}5</Description>
        <Description term="考试时间">{record.invoiceCodeStart} 至 {record.invoiceCodeStart}</Description>
    </DescriptionList>
  );
};

ExamInfor.defaultProps = {
    record: undefined,
    col:2,
    layout:'horizontal'
};

ExamInfor.propTypes = {
    record: PropTypes.object,
};

export default ExamInfor;