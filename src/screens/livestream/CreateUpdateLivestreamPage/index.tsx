import {
	Alert,
	Button,
	Card,
	Col,
	Divider,
	Form,
	Icon,
	Input,
	InputNumber,
	notification,
	Row,
	Spin,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { create_livestream } from '../../../graphql/create_livestream'
import { update_livestream } from '../../../graphql/update_livestream'
import { Livestream, LivestreamTarget } from '../../../types'
import { BroadcastTime } from '../SharingComponents/BroadcastTime'
import { ListTarget } from '../SharingComponents/ListTarget'
import { VideoComposer } from '../SharingComponents/VideoComposer'

export type CreateUpdateLivestreamPageProps = FormComponentProps &
	RouteComponentProps

export const CreateUpdateLivestreamPage = (withRouter as any)(
	Form.create<CreateUpdateLivestreamPageProps>()(
		(props: CreateUpdateLivestreamPageProps) => {
			const { form } = props
			const state = props.location?.state as { live: Livestream }
			const mode = state?.live ? 'update' : 'create'
			const livestream = state?.live

			if (props.location.pathname.includes('update-livestream') && !livestream)
				return <Redirect to="/livestream/create-livestream" />

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
						try {
							setLoading(true)
							if (mode == 'create') {
								await create_livestream(values)
							} else if (mode == 'update') {
								const task = {
									id: (livestream as any).id,
									...values,
								} as Livestream
								await update_livestream(task)
							}
							setLoading(false)
							form.resetFields()
							notification.open({
								message: 'Congratulation!',
								description: 'You saved livestream successfully',
								duration: 2000,
							})
							props.history.push('/livestream/all-livestreams')
						} catch (message) {
							setLoading(false)
							setError(message)
						}
					}
				})
			}

			return (
				<Card title={<BreadCrumb />}>
					<Spin
						spinning={loading}
						indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
					>
						<Form layout="vertical" onSubmit={handleSubmit}>
							<Row gutter={32}>
								<Col xs={24} md={12}>
									<Form.Item label="Campaign's name">
										{form.getFieldDecorator('name', {
											rules: [
												{
													required: true,
													message: `Please type campaign's name`,
												},
											],
											initialValue: livestream ? livestream.name : '',
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
											initialValue: livestream ? livestream.title : null,
										})(<Input />)}
									</Form.Item>

									<Form.Item label="Livestream descripton">
										{form.getFieldDecorator('description', {
											rules: [
												{
													required: true,
													message: 'Please input description !',
												},
											],
											initialValue: livestream ? livestream.description : null,
										})(<Input.TextArea rows={5} />)}
									</Form.Item>

									<Form.Item label="Video URLs">
										{form.getFieldDecorator('videos', {
											rules: [
												{ required: true, message: 'Please add some videos !' },
											],
											initialValue: livestream ? livestream.videos : [],
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
											initialValue: livestream ? livestream.loop_times : 1,
										})(<InputNumber min={1} max={100} />)}
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Broadcast time">
										{form.getFieldDecorator('times', {
											rules: [
												{ required: true, message: 'Please select time !' },
											],
											initialValue: livestream ? livestream.times : null,
										})(
											<BroadcastTime
												mode={mode}
												now={true}
												value={[]}
												onChange={() => {}}
											/>,
										)}
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
											initialValue: livestream
												? livestream.targets
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
				</Card>
			)
		},
	),
)
