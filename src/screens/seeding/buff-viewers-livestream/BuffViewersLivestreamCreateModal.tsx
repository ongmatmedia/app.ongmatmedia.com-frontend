/* eslint-disable @typescript-eslint/camelcase */
import {
	Alert,
	Button,
	Card,
	Col,
	Icon,
	Modal,
	notification,
	Row,
	Spin,
	Tag,
} from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormElement } from '../../../components/form/FormElement'
import { OrderInfo } from '../../../components/OrderInfo'
import { VideoUrlInput } from '../../../components/VideoUrlInput'
import { create_buff_viewers_livestream } from '../../../graphql/create_buff_viewers_livestream'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { withForm } from '../../../libs/Form'
import { User, VideoInfo } from '../../../types'
import { BuffViewersLivestreamSystemStatus } from './BuffViewersLivestreamSystemStatus'
import { isMobileDevice } from '../../../helpers/utils'

const query = graphql`
	query BuffViewersLivestreamCreateModalQuery {
		me {
			id
			balance
			price_percent
			pricing {
				buff_viewers_livestream
				vip_viewers_livestream
				livestream {
					p480
					p720
					p1080
				}
			}
		}
	}
`

export type BuffViewersLivestreamCreateModalProps = {
	onClose: Function
}

export type BuffViewersLivestreamCreateModalGraphqlData = { me: User }

export const BuffViewersLivestreamCreateModal = GraphQLWrapper<
	BuffViewersLivestreamCreateModalGraphqlData,
	BuffViewersLivestreamCreateModalProps
>(
	query,
	{},
	withForm(props => {
		const [error, set_error] = useState<string | null>(null)
		const [loading, set_loading] = useState<boolean>(false)
		const [video, set_video] = useState<VideoInfo | null>(null)

		const { t } = useTranslation('buff_viewers_livestream_create_modal')

		const limits_mins = [10, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300]

		const submit = () =>
			props.form.submit(async data => {
				set_error(null)
				set_loading(true)
				try {
					const inputData = {
						...data,
						note: 'add_from_web',
					}
					await create_buff_viewers_livestream(inputData)
					notification.success({ message: 'Successfully' })
					props.onClose()
				} catch (e) {
					set_error(e)
				}
				set_loading(false)
			})

		return (
			<Modal
				visible={true}
				onOk={() => submit()}
				onCancel={() => props.onClose()}
				destroyOnClose
				closable={true}
				okButtonProps={{ loading }}
				title={t('title')}
				style={{ top: isMobileDevice() ? 0 : 50 }}
			>
				<Spin spinning={props.loading}>
					{props.form.field({
						name: 'id',
						require: t('form.facebook_video_input.validatingErrorMessage'),
						render: ({
							error,
							loading,
							setValues,
							value,
							set_touched,
							touched,
						}) => (
								<FormElement
									label={t('form.facebook_video_input.title')}
									icon="user"
									error={error}
								>
									<Alert
										style={{ marginBottom: 5 }}
										message="Nhập video URL rồi bấm nút kính lúp bên cạnh để xác nhận video"
										type="info"
										showIcon
									/>

									<VideoUrlInput
										onSubmitVideo={info => {
											set_video(info)
											setValues({
												id: info.id,
												uid: info.owner.id,
												name: info.title || info.description,
											})
										}}
									/>
									{video && (
										<Row style={{ marginTop: 10 }}>
											<Col span={12}>
												<img style={{ width: '100%' }} src={video?.thumbnail} />
											</Col>
											<Col span={12}>
												<Card
													title={
														<>
															<Tag color="rgb(25, 188, 198)">
																{video.owner.name}{' '}
															</Tag>
															<Icon
																style={{ fontSize: 25 }}
																type="video-camera"
																onClick={() =>
																	window.open(`https://fb.com/${video.id}`)
																}
															/>
														</>
													}
													size="small"
												>
													{`${video.title} ${video.description}`.slice(0, 100)}
												</Card>
											</Col>
										</Row>
									)}
								</FormElement>
							),
					})}

					{props.form.field<number>({
						name: 'amount',
						require: t('form.viewer_amount_select.validatingErrorMessage'),
						render: ({
							error,
							loading,
							setValue,
							value,
							set_touched,
							touched,
						}) => (
								<FormElement
									label={t('form.viewer_amount_select.title')}
									icon="eye"
									error={error}
								>
									<BuffViewersLivestreamSystemStatus />
									<Row>
										{' '}
										<Col>
											{[50, 100, 150, 200, 250, 300, 500, 600, 700, 800, 900].map(
												amount => (
													<Button
														style={{ margin: 5, width: 100 }}
														type={amount == value ? 'primary' : 'dashed'}
														onClick={() => setValue(amount)}
													>
														{amount}
													</Button>
												),
											)}
										</Col>{' '}
									</Row>
									<Row>
										<Col>
											{[1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000].map(
												amount => (
													<Button
														style={{ margin: 5, width: 100 }}
														type={amount == value ? 'primary' : 'dashed'}
														onClick={() => setValue(amount)}
													>
														{amount}
													</Button>
												),
											)}
										</Col>{' '}
									</Row>
								</FormElement>
							),
					})}

					{props.form.field<number>({
						name: 'limit_mins',
						require: t('form.limit_mins_viewers.validatingErrorMessage'),
						render: ({
							error,
							loading,
							setValue,
							value,
							set_touched,
							touched,
						}) => (
								<FormElement
									label={t('form.limit_mins_viewers.title')}
									icon="eye"
								>
									{limits_mins.map(amount => (
										<Button
											style={{ margin: 5, width: 100 }}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{amount}
										</Button>
									))}
								</FormElement>
							),
					})}
					{/* 
					{props.form.field<string>({
						name: 'note',
						require: t('form.note_input.validatingErrorMessage'),
						initalValue: 'No note',
						render: ({
							error,
							loading,
							setValue,
							value,
							set_touched,
							touched,
						}) => (
								<FormElement
									label={t('form.note_input.title')}
									icon="eye"
									error={error}
								>
									<Input.TextArea
										placeholder={t('form.note_input.placeholder')}
										value={value}
										onChange={e => setValue(e.target.value)}
									/>
								</FormElement>
							),
					})} */}

					{props.data && props.form.data.limit_mins && props.form.data.amount && (
						<OrderInfo
							balance={props.data.me.balance}
							order={[
								{ amount: props.form.data.limit_mins, unit: 'mins' },
								{ amount: props.form.data.amount, unit: 'viewers' },
								{
									amount: props.data.me.pricing?.buff_viewers_livestream,
									unit: 'credit/viewer',
								},
							]}
						/>
					)}
					{error && <Alert showIcon type="error" message={error} />}
				</Spin>
			</Modal>
		)
	}),
)
