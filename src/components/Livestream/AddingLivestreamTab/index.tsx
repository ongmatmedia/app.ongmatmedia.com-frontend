import { Button, Col, Divider, Form, Input, notification, Row, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { create_livestream } from '../../../graphql/create_livestream';
import { LivestreamTarget, LivestreamFacebookTarget } from '../../../types';
import { BroadcastTime } from '../SharingComponents/BroadcastTime';
import { ListTarget } from '../SharingComponents/ListTarget';
import { VideoComposer } from '../SharingComponents/VideoComposer';

export type AddLivestreamTabProps = FormComponentProps & {
  setActiveTabKey: Function
};

export const AddingLivestreamTab = Form.create<AddLivestreamTabProps>()(
  (props: AddLivestreamTabProps) => {

    const { form } = props;

    const hasErrors = (fieldsError) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const [error, setError] = useState<string | null>()

    const handleSubmit = e => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          setError(null)
          console.log('Received values of form: ', values);
          const { name, title, description, videos, time, targets: { rtmps, facebooks } } = values;
          try {
            await create_livestream({
              name,
              title,
              description,
              videos,
              time,
              targets: {
                rtmps,
                facebooks
              }
            })
            form.resetFields()
            notification.open({
              message: "Congratulation!",
              description: "You created livestream successfully"
            })
            await new Promise(s => {
              setTimeout(() => {
                window.location.reload()
              }, 2000)
            })
            props.setActiveTabKey("1")
          } catch ({ name, message }) {
            setError(`${name}: ${message}`)
          }
        }
      });
    };

    const [broadcastTimeList, setBroadcastTimeList] = useState<number[]>([])

    return (
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Row gutter={32}>
          <Col xs={24} md={12}>
            <Form.Item label="Campaign's name">
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: `Please type campaign's name` }],
                initialValue: ''
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Livestream title">
              {form.getFieldDecorator('title', {
                rules: [{ required: true, message: `Please input livestream's title !` }],
                initialValue: null
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Livestream descripton">
              {form.getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input description !' }],
                initialValue: null
              })(<Input.TextArea rows={5} />)}
            </Form.Item>

            <Form.Item label="Video URLs">
              {form.getFieldDecorator('videos', {
                rules: [{ required: false, message: 'Please add some videos !' }],
                initialValue: []
              })(<VideoComposer value={[]} onChange={videos => form.setFieldsValue({ videos })} />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Broadcast time">
              {form.getFieldDecorator('time', {
                rules: [{ required: false, message: 'Please select time !' }],
                initialValue: null
              })(
                <BroadcastTime
                  now={true}
                  value={broadcastTimeList}
                  onChange={(newBroadcastTimeList: number[]) => setBroadcastTimeList([...newBroadcastTimeList])}
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
                initialValue: ({ rtmps: [], facebooks: [] } as LivestreamTarget),
              })(<ListTarget />)}
            </Form.Item>
          </Col>
        </Row>
        {error && (
          <Row>
            <Col xs={24}>
              <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />
            </Col>
          </Row>
        )}
        <Divider />
        <Row>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
                Save livestream
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  })