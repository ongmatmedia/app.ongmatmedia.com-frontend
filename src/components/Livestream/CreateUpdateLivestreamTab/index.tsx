import {
	Alert,
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	notification,
	Row,
	Spin,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { create_livestream } from '../../../graphql/create_livestream'
import { update_livestream } from '../../../graphql/update_livestream'
import { Livestream, LivestreamTarget } from '../../../types'
import { BroadcastTime } from '../SharingComponents/BroadcastTime'
import { ListTarget } from '../SharingComponents/ListTarget'
import { VideoComposer } from '../SharingComponents/VideoComposer'

export type CreateUpdateLivestreamTabProps = FormComponentProps & {
	setActiveTabKey: Function
	task: Livestream | null
	mode: string
	clearLiveCache: Function
}

export const CreateUpdateLivestreamTab = Form.create<
	CreateUpdateLivestreamTabProps
>()((props: CreateUpdateLivestreamTabProps) => {
	const { form } = props

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	const [error, setError] = useState<string | null>()
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = e => {
		e.preventDefault()
		form.validateFields(async (err, values) => {
			if (!err) {
				setError(null)
				// console.log('Received values of form: ', values);
				try {
					setLoading(true)
					if (props.mode == 'create') {
						await create_livestream(values)
					} else {
						const task = { id: (props.task as any).id, ...values } as Livestream
						await update_livestream(task)
					}
					form.resetFields()
					setLoading(false)
					props.clearLiveCache()
					notification.open({
						message: 'Congratulation!',
						description: 'You saved livestream successfully',
					})
					props.setActiveTabKey('1')
				} catch ({ name, message }) {
					setError(`${name}: ${message}`)
				}
			}
		})
	}

	return (
		<Spin spinning={loading}>
			<Form layout="vertical" onSubmit={handleSubmit}>
				<Row gutter={32}>
					<Col xs={24} md={12}>
						<Form.Item label="Campaign's name">
							{form.getFieldDecorator('name', {
								rules: [
									{ required: true, message: `Please type campaign's name` },
								],
								initialValue: props.task ? props.task.name : '',
							})(<Input />)}
						</Form.Item>

						<Form.Item label="Livestream title">
							{form.getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: `Please input livestream's title !`,
									},
								],
								initialValue: props.task ? props.task.title : null,
							})(<Input />)}
						</Form.Item>

						<Form.Item label="Livestream descripton">
							{form.getFieldDecorator('description', {
								rules: [
									{ required: true, message: 'Please input description !' },
								],
								initialValue: props.task ? props.task.description : null,
							})(<Input.TextArea rows={5} />)}
						</Form.Item>

						<Form.Item label="Video URLs">
							{form.getFieldDecorator('videos', {
								rules: [
									{ required: true, message: 'Please add some videos !' },
								],
								initialValue: props.task ? props.task.videos : [],
							})(
								<VideoComposer
									value={[]}
									onChange={videos => form.setFieldsValue({ videos })}
								/>,
							)}
						</Form.Item>
						<Form.Item label="Video loop times">
							{form.getFieldDecorator('loop_times', {
								rules: [
									{
										required: true,
										message: 'Please select video loop times !',
									},
								],
								initialValue: props.task ? props.task.loop_times : 0,
							})(<InputNumber min={1} max={100} />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Broadcast time">
							{form.getFieldDecorator('times', {
								rules: [{ required: true, message: 'Please select time !' }],
								initialValue: props.task ? props.task.times : null,
							})(<BroadcastTime now={true} value={[]} onChange={() => {}} />)}
						</Form.Item>

						<Form.Item label="Target">
							{form.getFieldDecorator('targets', {
								rules: [
									{
										validator: (
											rule,
											value: LivestreamTarget,
											done: Function,
										) => {
											if (
												value.rtmps.length == 0 &&
												value.facebooks.length == 0
											) {
												done(new Error('Add some target !'))
											} else {
												done()
											}
										},
									},
								],
								initialValue: props.task
									? props.task.targets
									: ({ rtmps: [], facebooks: [] } as LivestreamTarget),
							})(<ListTarget />)}
						</Form.Item>
					</Col>
				</Row>
				{error && (
					<Row>
						<Col xs={24}>
							<Alert
								message={error}
								type="error"
								showIcon
								style={{ marginBottom: 10 }}
							/>
						</Col>
					</Row>
				)}
				<Divider />
				<Row>
					<Col xs={24} style={{ textAlign: 'center' }}>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								disabled={hasErrors(form.getFieldsError())}
							>
								Save livestream
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Spin>
	)
})
