import { Alert, Form, Input, InputNumber, Modal, notification, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { create_livestream } from '../../../graphql/create_livestream';
import { update_livestream } from '../../../graphql/update_livestream';
import { Livestream, LivestreamTarget } from '../../../types';
import { BroadcastTime } from '../SharingComponents/BroadcastTime';
import { ListTarget } from '../SharingComponents/ListTarget';
import { VideoComposer } from '../SharingComponents/VideoComposer';

export type CreateLivestreamModalProps = FormComponentProps & {
  mode: 'create' | 'update';
  task?: Livestream;
  visible: boolean;
  onClose: Function;
};

export const CreateEditLivestreamModal = Form.create<CreateLivestreamModalProps>()(
  (props: CreateLivestreamModalProps) => {
    const [loading, set_loading] = useState<boolean>(
      props.mode == 'create' ? false : props.task == null,
    );
    const [error, set_error] = useState<string | null>(null);

    props.mode == 'update' &&
      useEffect(() => set_loading(props.task == null), [props.task == null]);

    const { form } = props;

    const hasErrors = (fieldsError) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    
    const submit = () => {
      form.validateFields(async (err, values) => {
        if (err) return;

        console.log('Received values of form: ', values);
        set_loading(true);
        try {
          if (props.mode == 'create') {
            await create_livestream(values);
          } else {
            const task = { id: (props.task as any).id, ...values } as Livestream;
            await update_livestream(task);
          }
          form.resetFields();
          props.onClose();
          notification.open({
            message: "Congratulation!",
            description: "You updated livestream successfully"
          })
        } catch (e) {
          set_error(e.message);
        }
        set_loading(false);
      });
    };

    return (
      <Modal
        visible={props.visible}
        title="Update livestream"
        okText="Ok"
        onCancel={() => (form.resetFields(), props.onClose())}
        onOk={() => submit()}
        destroyOnClose={true}
        okButtonProps={{ disabled: hasErrors(form.getFieldsError()) }}
      >
        <Spin spinning={loading}>
          {error && <Alert type="error" message={error} style={{ padding: 5 }} />}
          <Form layout="vertical">
            <Form.Item label="Campaign's name">
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: `Please type campaign's name` }],
                initialValue: props.task ? props.task.name : '',
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Livestream title">
              {form.getFieldDecorator('title', {
                rules: [{ required: true, message: `Please input livestream's title !` }],
                initialValue: props.task ? props.task.title : null,
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Livestream's descripton">
              {form.getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input description !' }],
                initialValue: props.task ? props.task.description : null,
              })(<Input.TextArea rows={5} />)}
            </Form.Item>

            <Form.Item label="Video URLs">
              {form.getFieldDecorator('videos', {
                rules: [{ required: true, message: 'Have at least 1 video!' }],
                initialValue: props.task ? props.task.videos : [],
              })(<VideoComposer value={[]} onChange={videos => form.setFieldsValue({ videos })} />)}
            </Form.Item>

            <Form.Item label="Video loop times">
              {form.getFieldDecorator('loop_times', {
                rules: [{ required: true, message: 'Please select video loop times !' }],
                initialValue: props.task ? props.task.loop_times : 0
              })(
                <InputNumber min={1} max={100} />
              )}
            </Form.Item>

            <Form.Item label="Broadcast time">
              {form.getFieldDecorator('times', {
                rules: [{ required: true, message: 'Please select time !' }],
                initialValue: props.task ? props.task.times : null,
              })(
                <BroadcastTime
                  now={true}
                  value={new Array<number>()}
                  onChange={() => {}}
                />)}
            </Form.Item>

            <Form.Item label="Target">
              {form.getFieldDecorator('targets', {
                rules: [
                  {
                    validator: (rule, value: LivestreamTarget, done: Function) => {
                      if (value.rtmps.length == 0 && value.facebooks.length == 0) {
                        done(new Error('Add some target !'));
                      } else {
                        done();
                      }
                    },
                  },
                ],
                initialValue: props.task
                  ? props.task.targets
                  : ({ rtmps: [], facebooks: [] } as LivestreamTarget),
              })(<ListTarget />)}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  },
);
