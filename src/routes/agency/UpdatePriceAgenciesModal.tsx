import { Alert, Modal, Spin, Input, Icon } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { User } from '../../schema/User/User'
import { withForm } from '../../containers/Form'

export type UpdatePriceAgenciesModalProps = {
  visible: boolean
  onClose: Function
  selectedAgencies: Set<User>
}



export const UpdatePriceAgenciesModal = withForm<UpdatePriceAgenciesModalProps>(props => {


  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);

  const submit = async () => {
    props.form.submit(async values => {
      set_loading(true)
      try {
        set_error(null)
        set_loading(false)
        props.onClose()
      } catch (e) {
        set_error(e.source.errors[0].message)
        set_loading(false)
      }
    })
  }


  return (
    <span>
      <Modal
        title="Update price for all"
        visible={props.visible}
        onOk={submit}
        onCancel={() => props.onClose()}
      >
        <Spin spinning={loading} >
          {
            error && <Alert type="error" message={error} />
          }
          <Form>
            <Form.Item label="Price percent">
              {
                props.form.field<number>({
                  name: 'price_percent',
                  require: 'Price percent is required',
                  initalValue: 0,
                  render: ({ value, setValue, error }) => (
                    <div>
                      <InputNumberAutoSelect defaultValue={value} onChangeValue={setValue} />
                    </div>
                  )
                })
              }
            </Form.Item>
            <Form.Item label="Vip Viewers Livestream">
              {
                props.form.field<number>({
                  name: 'vip_viewers_livestream',
                  require: 'Vip Viewers Livestream is required',
                  initalValue: 0,
                  render: ({ value, setValue, error }) => (
                    <div>
                      <InputNumberAutoSelect defaultValue={value} onChangeValue={setValue} />
                    </div>
                  )
                })
              }
            </Form.Item>
            <Form.Item label="Vip Buff Livestream">
              {
                props.form.field<number>({
                  name: 'vip_buff_livestream',
                  require: 'Vip Buff Livestream is required',
                  initalValue: 0,
                  render: ({ value, setValue, error }) => (
                    <div>
                      <InputNumberAutoSelect defaultValue={value} onChangeValue={setValue} />
                    </div>
                  )
                })
              }
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </span>
  )
})