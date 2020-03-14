import { Form, Input, Modal, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';

export type AccountAddModalProps = FormComponentProps & {
  visible: boolean;
  onClose: Function;
};

export const AddAccountModal = Form.create<AccountAddModalProps>()(
  (props: AccountAddModalProps) => {
    const { form } = props;
    const [loading, set_loading] = useState<boolean>(false);

    const submit = async () => {
      form.validateFields(async (err, values) => {
        if (err) return;
        set_loading(true)
        console.log({values})
        // Perform an asynchorounous operation

        // End asynchorounous operation
        form.resetFields();
        set_loading(false);
        props.onClose();
      });
    };

    return (
      <Modal
        visible={props.visible}
        title="Add your account data"
        okText="Import"
        onCancel={() => props.onClose()}
        onOk={() => submit()}
      >
        <Spin spinning={loading}>
          <Form layout="vertical">
            <Form.Item label="Data">
              {form.getFieldDecorator('data', {
                rules: [{ required: true, message: 'Please input your data (cookies,access token,etc) !' }],
              })(<Input.TextArea rows={5} />)}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  },
);
