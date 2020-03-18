import React, { useState } from 'react';
import { Form, Modal, Input, Icon, InputNumber, Spin, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { create_user } from '../../graphql/create_user';

export type CreateAgencyModalProps = FormComponentProps & {
  visible: boolean;
  onClose: Function;
};

export const CreateAgencyModal = Form.create<CreateAgencyModalProps>()(
  (props: CreateAgencyModalProps) => {
    const [loading, set_loading] = useState<boolean>(false);
    const [error, set_error] = useState<string | null>(null);

    const submit = () => {
      props.form.validateFields(async (err, values) => {
        set_loading(true);
        if (!err) {
          try {
            await create_user(values.username, values.password, values.price_percent, values.email);
            set_error(null);
            props.onClose();
          } catch (e) {
            set_error(e.message);
          }
        }
        set_loading(false);
      });
    };

    return (
      <span>
        <Modal
          title="Create user or agency"
          visible={props.visible}
          onOk={submit}
          onCancel={() => props.onClose()}
        >
          <Spin spinning={loading}>
            {error && <Alert type="error" message={error} />}
            <Form>
              <Form.Item label="Username">
                {props.form.getFieldDecorator('username', {
                  rules: [{ required: true }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item label="Email">
                {props.form.getFieldDecorator('email', {
                  rules: [{ required: true }],
                })(<Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item label="Password">
                {props.form.getFieldDecorator('password', {
                  rules: [{ required: true }],
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item label="Price percent">
                {props.form.getFieldDecorator('price_percent', {
                  rules: [{ required: true }],
                })(<InputNumber min={0} max={100} />)}
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </span>
    );
  },
);
