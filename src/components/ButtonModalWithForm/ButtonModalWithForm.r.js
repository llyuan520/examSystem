/**
 * Created by liurunbin on 2018/1/17.
 */
import React, { Component } from "react";
import { Button, Icon, Modal, Form, Row, message } from "antd";
import PropTypes from "prop-types";
import { request, getFields,formatMoment } from "utils";

class ButtonModalWithForm extends Component {
  static propTypes = {
    buttonOptions: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string
    }),
    formOptions: PropTypes.shape({
      type          : PropTypes.oneOf(["post", "put"]).isRequired,
      url           : PropTypes.string.isRequired,
      fields        : PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      disabled      : PropTypes.bool,
      onSuccess     : PropTypes.func,
      onValuesChange: PropTypes.func,
      children      : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element
      ])
    }).isRequired,
    modalOptions: PropTypes.shape({
      title: PropTypes.string
    })
  };
  static defaultProps = {
    buttonOptions: {
      text: "button",
      icon: "upload"
    },
    modalOptions: {
      title: "标题"
    }
  };
  state = {
    visible: false,
    loading: false
  };
  toggleLoading = loading => {
    this.setState({
      loading
    });
  };
  toggleVisible = visible => {
    if (!visible) {
      this.props.form.resetFields();
    }
    this.setState({
      visible
    });
  };
  /*componentWillReceiveProps(nextProps){
        console.log(nextProps.formOptions.url)
    }*/
  handleSubmit = e => {
    e && e.preventDefault();
    const { type, url, onSuccess } = this.props.formOptions;
    const { text }                 = this.props.buttonOptions;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.toggleLoading(true);
        const formData = new FormData();

        if (values.files) {
          values.files = values.files[0];
        }

        values = formatMoment(values);
        for (let key in values) {
          formData.append(key, values[key]);
        }
        request[type](url, values)
          .then(({ data }) => {
            this.toggleLoading(false);
            if (data.code === 200) {
              message.success(`${text}成功!`);
              this.toggleVisible(false);
              onSuccess && onSuccess();
            } else {
              message.error(`${text}失败:${data.msg}`);
            }
          })
          .catch(err => {
            this.toggleLoading(false);
          });
      }
    });
  };
  render() {
    const props                                        = this.props;
    const { buttonOptions, modalOptions, formOptions } = props;
    const { visible, loading }                         = this.state;
    return (
      <span style={props.style}>
        <Button
          size     = "small"
          disabled = {formOptions.disabled}
          onClick  = {() => {
            this.toggleVisible(true);
            buttonOptions.onClick && buttonOptions.onClick();
          }}
        >
          {buttonOptions.icon && <Icon type={buttonOptions.icon} />}
          {buttonOptions.text}
        </Button>
        <Modal
          {...modalOptions}
          maskClosable   = {false}
          destroyOnClose = {true}
          visible        = {visible}
          confirmLoading = {loading}
          onOk           = {this.handleSubmit}
          onCancel       = {() => this.toggleVisible(false)}
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>{getFields(this.props.form, formOptions.fields)}</Row>
            {formOptions && formOptions.children && (
              <Row>{formOptions.children}</Row>
            )}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create({
  onValuesChange: (props, values) => {
    //给外部一个获得搜索条件的回调
    props.formOptions.onValuesChange &&
      props.formOptions.onValuesChange(formatMoment(values));
  }
})(ButtonModalWithForm);
