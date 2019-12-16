import { Alert, Form, Modal, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { User } from '../../schema/User/User'

export type UpdatePriceAgenciesModalProps = FormComponentProps & {
  visible: boolean
  onClose: Function
  selectedAgencies: Set<User>
}



export const UpdatePriceAgenciesModal = Form.create<UpdatePriceAgenciesModalProps>()((props: UpdatePriceAgenciesModalProps) => {


  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);
  const [priceForAll, setPriceForAll] = useState<number>(0);

  const submit = async () => {
    set_loading(true)
    try {
      set_error(null)
      set_loading(false)
      props.onClose()
    } catch (e) {
      set_error(e.source.errors[0].message)
      set_loading(false)
    }
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
            <Form.Item label="Price for all">
              <InputNumberAutoSelect onChangeValue={price => setPriceForAll(price)} defaultValue={0} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </span>
  )
})