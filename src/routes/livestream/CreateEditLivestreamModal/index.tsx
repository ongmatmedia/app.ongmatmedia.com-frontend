import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import {SelectTarget} from './SelectTarget'
import { LivestreamTarget } from '../../../schema/Services/Livestream/LivestreamTarget'

export type CreateLivestreamModalProps = FormComponentProps & {
    visible: boolean
    onClose: Function
}

const CustomInputComponent = (props: {onChange?: Function, value?: string}) => (
    <input defaultValue={props.value} onChange={e => props.onChange && props.onChange(e.target.value)} />
)

export const CreateEditLivestreamModal = Form.create<CreateLivestreamModalProps>()((props: CreateLivestreamModalProps) => {

    const { form } = props
    const [loading, set_loading] = useState<boolean>(false)

    const submit = () => {

        form.validateFields((err, values) => {
            console.log({err, values})
        })

        props.onClose()
    }

    return (
        <Modal
            visible={props.visible}
            title="Add livestream schedule"
            okText="Ok"
            onCancel={() => props.onClose()}
            onOk={() => submit()}
        >
            <Spin spinning={loading}>
                <Form layout="vertical">
                    <Form.Item label="Name">
                        {form.getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input cookies !' }],
                        })(<CustomInputComponent />)}
                    </Form.Item>

                    <Form.Item label="Target">
                        {form.getFieldDecorator<{target: LivestreamTarget}>('target', {
                            rules: [{ required: true, message: 'Add target !' }]
                        })(<SelectTarget />)}
                    </Form.Item>

                    



                </Form>
            </Spin>
        </Modal>
    )

})