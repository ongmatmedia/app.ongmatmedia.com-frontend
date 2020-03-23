import {
	Alert,
	Avatar,
	Card,
	Col,
	Form as AntdForm,
	Icon,
	Input,
	Modal,
	notification,
	Row,
	Select,
	Spin,
	Tag,
	Slider,
} from 'antd'
import React, { useState } from 'react'
import { VideoInput } from './VideoInput'
import { withForm } from '../../../libs/Form'

const IconFont = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

export type BuffViewersCreateModalProps = {
	onClose: Function
}

export const BuffViewersCreateModal = withForm<BuffViewersCreateModalProps>(
	props => {
		const [error, set_error] = useState<string | null>(null)
		const [loading, set_loading] = useState<boolean>(false)
		const [editing_uid_visible, set_editing_uid_visible] = useState<boolean>(
			true,
		)

		const submit = () =>
			props.form.submit(async data => {
				console.log(data)
			})

		let OrderInfoCard: any = null

		if (true) {
			const price = 123
			const total = 123

			OrderInfoCard = (
				<Card
					title="Order infomation"
					size="small"
					style={{ lineHeight: '2em' }}
				>
					<Row>
						<Tag color="#108ee9">{props.form.data.amount} viewers</Tag> x{' '}
						<Tag color="#108ee9">
							{price.toLocaleString()}
							<Icon
								type="dollar"
								style={{
									fontSize: 16,
									verticalAlign: '-0.2em',
									paddingLeft: 3,
									color: 'white',
								}}
							/>{' '}
							/viewer{' '}
						</Tag>{' '}
						={' '}
						<Tag color="#108ee9">
							{total.toLocaleString()}
							<Icon
								type="dollar"
								style={{
									fontSize: 16,
									verticalAlign: '-0.2em',
									paddingLeft: 3,
									color: 'white',
								}}
							/>
						</Tag>
					</Row>

					<Row>
						Your balance:{' '}
						<Tag color="#108ee9">
							{
								// props.data.me.balance.toLocaleString()
								123
							}
							<Icon
								type="dollar"
								style={{
									fontSize: 16,
									verticalAlign: '-0.2em',
									paddingLeft: 3,
									color: 'white',
								}}
							/>{' '}
						</Tag>
					</Row>
				</Card>
			)
		}

		return (
			<Modal
				visible={true}
				onOk={() => submit()}
				onCancel={() => props.onClose()}
				destroyOnClose
				closable={false}
				okButtonProps={{ loading }}
				title="Buff viewers for livestream"
			>
				<Spin spinning={false}>
					<AntdForm>
						{error && <Alert type="error" message={error} />}
						{props.form.field({
							name: 'id',
							require: 'Enter Facebook Livestream URL',
							render: ({
								error,
								loading,
								setValues,
								value,
								set_touched,
								touched,
							}) => (
								<AntdForm.Item>
									<Row type="flex" justify="space-between" align="middle">
										<Col>
											<h3>
												<Icon type="user" /> Facebook Video URL
												<Tag
													style={{ background: '#fff', borderStyle: 'dashed' }}
												>
													{' '}
													Require{' '}
												</Tag>
											</h3>
										</Col>
									</Row>
									{error && <Alert type="error" message={error} />}
									{value && value != '' && (
										<Row
											type="flex"
											justify="space-between"
											align="middle"
											className="livestream-target-item"
											style={{ padding: 5, borderRadius: 5 }}
										>
											<Col span={4}>
												<Avatar
													src={`http://graph.facebook.com/${props.form.data.uid}/picture?type=large`}
													size={60}
												/>
											</Col>
											<Col span={14}>
												<div style={{ padding: 10, flexWrap: 'wrap' }}>
													{' '}
													{props.form.data.name}{' '}
												</div>
											</Col>
											<Col span={6}>
												<Icon
													type="edit"
													style={{
														color: 'black',
														marginRight: 10,
														fontSize: 20,
														cursor: 'pointer',
													}}
													onClick={() => set_editing_uid_visible(true)}
												/>
												<Icon
													type="video-camera"
													style={{
														color: 'black',
														marginRight: 10,
														fontSize: 20,
														cursor: 'pointer',
													}}
													onClick={() =>
														window.open(`https://fb.com/${props.form.data.id}`)
													}
												/>
												<Icon
													type="message"
													style={{
														color: 'black',
														marginRight: 10,
														fontSize: 20,
														cursor: 'pointer',
													}}
													onClick={() =>
														window.open(`https://m.me/${props.form.data.uid}`)
													}
												/>
												<IconFont
													type="icon-facebook"
													style={{
														color: 'black',
														fontSize: 20,
														cursor: 'pointer',
													}}
													onClick={() =>
														window.open(`https://fb.com/${props.form.data.uid}`)
													}
												/>
											</Col>
										</Row>
									)}

									{editing_uid_visible && (
										<VideoInput
											placeholder="www.facebook.com/***/videos/**"
											onSelect={({ name, image, type, id, uid }) => {
												setValues({ id, name, uid })
												set_editing_uid_visible(false)
											}}
											onError={() => {
												set_editing_uid_visible(true)
												Modal.error({ title: 'Invaild UID' })
											}}
										/>
									)}
								</AntdForm.Item>
							),
						})}
						{props.form.field<number>({
							name: 'amount',
							require: 'Select amount',
							render: ({
								error,
								loading,
								setValue,
								value,
								set_touched,
								touched,
							}) => (
								<AntdForm.Item>
									<Row type="flex" justify="space-between" align="middle">
										<Col>
											<h3>
												<Icon type="eye" /> Viewers amount{' '}
												<Tag
													style={{ background: '#fff', borderStyle: 'dashed' }}
												>
													{' '}
													Require{' '}
												</Tag>
											</h3>
										</Col>
									</Row>
									{error && <Alert type="error" message={error} />}

									<Select
										onChange={setValue}
										placeholder="Click to select viewers amount when livestream"
									>
										{[
											50,
											100,
											150,
											200,
											250,
											300,
											400,
											450,
											500,
											600,
											700,
											800,
											900,
											1000,
											1500,
											2000,
											2500,
											3000,
											3500,
											4000,
											4500,
											5000,
										].map(amount => (
											<Select.Option value={amount}>{amount}</Select.Option>
										))}
									</Select>
								</AntdForm.Item>
							),
						})}

						{props.form.field<string>({
							name: 'note',
							require: 'Enter note',
							render: ({
								error,
								loading,
								setValue,
								value,
								set_touched,
								touched,
							}) => {
								return (
									<AntdForm.Item>
										<Row type="flex" justify="space-between" align="bottom">
											<Col>
												<h3>
													<Icon type="form" /> Note{' '}
													<Tag
														style={{
															background: '#fff',
															borderStyle: 'dashed',
														}}
													>
														{' '}
														Require{' '}
													</Tag>
												</h3>
											</Col>
											<Col></Col>
										</Row>
										{error && <Alert type="error" message={error} />}
										<Input
											placeholder="Some note for this VIP"
											value={value}
											onChange={e => setValue(e.target.value)}
											allowClear
										/>
									</AntdForm.Item>
								)
							},
						})}
					</AntdForm>
					{OrderInfoCard}
				</Spin>
			</Modal>
		)
	},
)
