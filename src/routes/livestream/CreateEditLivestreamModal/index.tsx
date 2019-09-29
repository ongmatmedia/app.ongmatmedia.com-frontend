import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Spin, Switch, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { ListTarget } from './ListTarget'
import { LivestreamTarget } from '../../../schema/Services/Livestream/LivestreamTarget'
import { Livestream } from '../../../schema/Services/Livestream/Livestream'
import { DateTimePicker } from './DateTimePicker'
import { VideoComposer } from './VideoComposer'

export type CreateLivestreamModalProps = FormComponentProps & {
    loading?: boolean
    task?: Livestream
    visible: boolean
    onClose: Function
} 

export const CreateEditLivestreamModal = Form.create<CreateLivestreamModalProps>()((props: CreateLivestreamModalProps) => {

    const { form } = props
    const [target_error, set_target_error] = useState<string | null>(null)

    const submit = () => {
        form.validateFields((err, values) => {
            if (err) return
            console.log(values)
            form.resetFields()
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
            <Spin spinning={props.loading}>
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

                    {/* <Form.Item label="Tags">
                        {form.getFieldDecorator('tags')(<Select mode="tags" />)}
                    </Form.Item>

                    <Form.Item label="Location">
                        {form.getFieldDecorator('location')(<Input />)}
                    </Form.Item>

                    <Form.Item label="Reaction">
                        {form.getFieldDecorator('reaction')(<Input />)}
                    </Form.Item> */}

                    <Form.Item label="Broadcast time">
                        {form.getFieldDecorator('time', {
                            rules: [{ required: true, message: 'Please select time !' }],
                        })(<DateTimePicker />)}
                    </Form.Item>

                    <Form.Item label="Target">
                        {form.getFieldDecorator<{ target: LivestreamTarget }>('target', {
                            rules: [{
                                validator: (rule, value: LivestreamTarget) => set_target_error(
                                    (value.rtmps.length == 0 && value.facebooks.length == 0) ? 'Add some target !' : null
                                )
                            }],
                            initialValue: props.task ? props.task.targets : { rtmps: [], facebooks: [] } as LivestreamTarget
                        })(<ListTarget error={target_error} />)}
                    </Form.Item>





                </Form>
            </Spin>
        </Modal>

    )

})