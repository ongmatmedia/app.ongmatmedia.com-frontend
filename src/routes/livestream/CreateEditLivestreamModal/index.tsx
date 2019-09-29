import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Spin, Switch, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { ListTarget } from './ListTarget'
import { LivestreamTarget } from '../../../schema/Services/Livestream/LivestreamTarget'
import { Livestream } from '../../../schema/Services/Livestream/Livestream'
import { DateTimePicker } from './DateTimePicker'
import { VideoComposer } from './VideoComposer'
import { LivestreamInput } from '../../../schema/Services/Livestream/LivestreamInput'
import { LivestreamUpdateInput } from '../../../schema/Services/Livestream/LivestreamUpdateInput'
import { create_livestream } from '../../../relayjs-mutations/create_livestream'

export type CreateLivestreamModalProps = FormComponentProps & {
    mode: 'create' | 'update'
    task?: Livestream 
    visible: boolean
    onClose: Function
}

export const CreateEditLivestreamModal = Form.create<CreateLivestreamModalProps>()((props: CreateLivestreamModalProps) => {

    const [loading, set_loading] = useState<boolean>(props.mode == 'create' ? false : props.task == null)

    const { form } = props

    const submit = () => {
        form.validateFields(async (err, values) => {
            if (err) return

            set_loading(true)
            props.mode == 'create' && await create_livestream(values)
            set_loading(false)
            form.resetFields()
            props.onClose()
        })
    }

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
                <Form layout="vertical">

                    <Form.Item label="Name">
                        {form.getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input videos !' }],
                            initialValue: props.task ? props.task.name : ''
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Video URL">
                        {form.getFieldDecorator('videos', {
                            rules: [{ required: true, message: 'Please add some videos !' }],
                            initialValue: props.task ? props.task.videos : []
                        })(<VideoComposer />)}
                    </Form.Item>

                    <Form.Item label="Video title">
                        {form.getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input title !' }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Video descripton">
                        {form.getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input description !' }],
                        })(<Input.TextArea rows={5} />)}
                    </Form.Item>


                    <Form.Item label="Broadcast time">
                        {form.getFieldDecorator('time', {
                            rules: [{ required: true, message: 'Please select time !' }],
                        })(<DateTimePicker />)}
                    </Form.Item>

                    <Form.Item label="Target">
                        {form.getFieldDecorator('targets', {
                            rules: [{
                                validator: (rule, value: LivestreamTarget, done: Function) => {
                                    if (value.rtmps.length == 0 && value.facebooks.length == 0) {
                                        done(new Error('Add some target !'))
                                    } else {
                                        done()
                                    }
                                }
                            }],
                            initialValue: props.task ? props.task.targets : { rtmps: [], facebooks: [] } as LivestreamTarget
                        })(<ListTarget />)}
                    </Form.Item>

                </Form>
            </Spin>
        </Modal>

    )

})