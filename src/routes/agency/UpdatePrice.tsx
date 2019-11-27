import { Button, Card, Col, Form, InputNumber, Row, Alert, notification, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { update_pricing } from '../../relayjs-mutations/update_pricing';

export const UpdatePrice = Form.create<FormComponentProps>()((props: FormComponentProps
) => {
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null)

  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        set_loading(true)
        try {
          await update_pricing({
            buff_viewers_livestream: values.buff_viewers_livestream,
            vip_viewers_livestream: values.vip_viewers_livestream,
            livestream: {
              p480: values.p480,
              p720: values.p720,
              p1080: values.p1080
            }
          })
          set_loading(false)
        } catch (e) {
          set_error(e.source.errors[0].message)
          set_loading(false)
        }
      }
    });
  }

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  return (
    <>
      <Card title="Update Price" bordered={false}>
        <Row type="flex" justify="space-around" align="middle">
          <Col md="12" xxl="12" sm="24">
            {
              error && <Alert type="error" message={error} />
            }
            <Form>
              <Form.Item label="Buff Viewers Livestream">
                {
                  props.form.getFieldDecorator('buff_viewers_livestream', {
                    rules: [{ required: true }]
                  })(
                    <InputNumber
                      min={0}
                      formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => (value || '').replace(/VND\s?|(,*)/g, '')}
                    />
                  )
                }
              </Form.Item>
              <Form.Item label="Vip Viewers Livestream">
                {
                  props.form.getFieldDecorator('vip_viewers_livestream', {
                    rules: [{ required: true }]
                  })(
                    <InputNumber min={0} formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => (value || '').replace(/VND\s?|(,*)/g, '')}
                    />
                  )
                }
              </Form.Item>
              <Form.Item label="Livestream 480P">
                {
                  props.form.getFieldDecorator('p480', {
                    rules: [{ required: true }]
                  })(
                    <InputNumber min={0} formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => (value || '').replace(/VND\s?|(,*)/g, '')}
                    />
                  )
                }
              </Form.Item>
              <Form.Item label="Livestream 720P">
                {
                  props.form.getFieldDecorator('p720', {
                    rules: [{ required: true }]
                  })(
                    <InputNumber min={0} formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => (value || '').replace(/VND\s?|(,*)/g, '')}
                    />
                  )
                }
              </Form.Item>
              <Form.Item label="Livestream 1080P">
                {
                  props.form.getFieldDecorator('p1080', {
                    rules: [{ required: true }]
                  })(
                    <InputNumber min={0} formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => (value || '').replace(/VND\s?|(,*)/g, '')}
                    />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  disabled={hasErrors(props.form.getFieldsError())}
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  )
})