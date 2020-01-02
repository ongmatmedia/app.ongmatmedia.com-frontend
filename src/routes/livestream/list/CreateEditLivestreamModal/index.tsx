import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Radio, Spin, Switch, Select, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ListTarget } from './ListTarget';
import { LivestreamTarget } from '../../../../schema/Services/Livestream/LivestreamTarget';
import { Livestream } from '../../../../schema/Services/Livestream/Livestream';
import { DateTimePicker } from './DateTimePicker';
import { VideoComposer } from './VideoComposer';
import { create_livestream } from '../../../../relayjs-mutations/create_livestream';
import { update_livestream } from '../../../../relayjs-mutations/update_livestream';

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

    const submit = () => {
      form.validateFields(async (err, values) => {
        if (err) return;

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
        } catch (e) {
          set_error(e.message);
        }
        set_loading(false);
      });
    };

    return (
      <Modal
        visible={props.visible}
        title="Add livestream schedule"
        okText="Ok"
        onCancel={() => (form.resetFields(), props.onClose())}
        onOk={() => submit()}
        destroyOnClose={true}
      >
        <Spin spinning={loading}>
          {error && <Alert type="error" message={error} style={{ padding: 5 }} />}
          <Form layout="vertical">
            <Form.Item label="Name">
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input videos !' }],
                initialValue: props.task ? props.task.name : '',
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Video URL">
              {form.getFieldDecorator('videos', {
                rules: [{ required: true, message: 'Please add some videos !' }],
                initialValue: props.task ? props.task.videos : [],
              })(<VideoComposer />)}
            </Form.Item>

            <Form.Item label="Video title">
              {form.getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input title !' }],
                initialValue: props.task ? props.task.title : null,
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Video descripton">
              {form.getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input description !' }],
                initialValue: props.task ? props.task.description : null,
              })(<Input.TextArea rows={5} />)}
            </Form.Item>

            <Form.Item label="Broadcast time">
              {form.getFieldDecorator('time', {
                rules: [{ required: true, message: 'Please select time !' }],
                initialValue: props.task ? props.task.time : null,
              })(<DateTimePicker now={props.mode == 'create'} />)}
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
