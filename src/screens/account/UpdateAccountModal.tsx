import { Form, Input, Modal, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { sleep } from '../../helpers/utils';

export type UpdateAccountModalProps = FormComponentProps & {
  visible: boolean;
  onClose: Function;
  accountId: string
};

export const UpdateAccountModal = Form.create<UpdateAccountModalProps>()(
  (props: UpdateAccountModalProps) => {
    const { form } = props;
    const [loading, set_loading] = useState<boolean>(false);

    const submit = async () => {
      form.validateFields(async (err, values) => {
        if (err) return;
        set_loading(true)
        console.log({ values })
        // Perform an asynchorounous operation
        await sleep(2)
        // End asynchorounous operation
        form.resetFields();
        set_loading(false);
        props.onClose();
      });
    };

    return (
      <Modal
        visible={props.visible}
        title="Update Account information"
        okText="Save account"
        onCancel={() => props.onClose()}
        onOk={() => submit()}
      >
        <Spin spinning={loading}>
          <Form layout="vertical">
            <Form.Item label="Account id">
              {form.getFieldDecorator('id', {
                rules: [{ required: false, message: 'Please input your account id' }],
              })(<Input value={props.accountId} />)}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  },
);