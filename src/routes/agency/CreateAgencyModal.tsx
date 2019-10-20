import React from 'react'
import { Form, Modal, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

export type CreateAgencyModalProps = FormComponentProps & {
    visible: boolean
    onClose: Function
}



export const CreateAgencyModal = Form.create<CreateAgencyModalProps>()((props: CreateAgencyModalProps) => {

    const submit = () => {

    }

    return (
        <span>
            <Modal
                title="Create user or agency"
                visible={props.visible}
                onCancel={() => props.onClose()}
            >
                <Form >
                    <Form.Item label="Username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Price percent">
                        <Input type="number"/>
                    </Form.Item>
                </Form>
            </Modal>
        </span>
    )
})