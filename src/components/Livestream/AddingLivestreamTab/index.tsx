import React from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Row, Col, Input } from 'antd';
import { LivestreamTarget } from '../../../types';
import { VideoComposer } from './VideoComposer';
import { BroadcastTime } from './BroadcastTime';
import { ListTarget } from './ListTarget';

export type AddLivestreamTabProps = FormComponentProps & {
  setActiveTabKey: Function
};

export const AddingLivestreamTab = Form.create<AddLivestreamTabProps>()(
  (props: AddLivestreamTabProps) => {

    const { form } = props;

    return (
      <Form layout="vertical">
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
                rules: [{ required: true, message: 'Please input title !' }],
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
                rules: [{ required: true, message: 'Please add some videos !' }],
                initialValue: [
                  {
                    title: 'test',
                    is_livestream: true,
                    video_id: '123456',
                    thumbnail_url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                    url: 'https://www.youtube.com/watch?v=kRvYqzCJ4vw'
                  },
                  {
                    title: 'test',
                    is_livestream: true,
                    video_id: '123456',
                    thumbnail_url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                    url: 'https://www.youtube.com/watch?v=kRvYqzCJ4vw'
                  },
                  {
                    title: 'test',
                    is_livestream: true,
                    video_id: '123456',
                    thumbnail_url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                    url: 'https://www.youtube.com/watch?v=kRvYqzCJ4vw'
                  }
                ]
              })(<VideoComposer />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Broadcast time">
              {form.getFieldDecorator('time', {
                rules: [{ required: true, message: 'Please select time !' }],
                initialValue: null
              })(<BroadcastTime now={true} />)}
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
      </Form>
    )
  })