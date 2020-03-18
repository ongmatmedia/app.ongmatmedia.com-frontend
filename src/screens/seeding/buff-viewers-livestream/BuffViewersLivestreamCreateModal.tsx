import {
	Alert,
	Avatar,
	Card,
	Col,
	Icon,
	Input,
	Modal,
	notification,
	Row,
	Select,
	Spin,
	Tag,
} from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User, VideoInfo } from '../../../types'
import { withForm } from '../../../libs/Form'
import { create_buff_viewers_livestream } from '../../../graphql/create_buff_viewers_livestream'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { FormElement } from '../../../components/form/FormElement'
import { OrderInfo } from '../../../components/OrderInfo'
import { VideoUrlInput } from '../../../components/VideoUrlInput'
import Moment from 'react-moment'

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

		const viewers_amount = new Array(100)
			.fill(0)
			.map((_, index) => (index + 1) * 50)
		const limits_mins = [10, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300]

		const submit = () =>
			props.form.submit(async data => {
				set_error(null)
				set_loading(true)
				try {
					await create_buff_viewers_livestream(data)
					notification.success({ message: 'Create success' })
					props.onClose()
				} catch (e) {
					set_error(e.message)
				}
				set_loading(false)
			})

		return (
			<Modal
				visible={true}
				onOk={() => submit()}
				onCancel={() => props.onClose()}
				destroyOnClose
				closable={false}
				okButtonProps={{ loading }}
				title={t('title')}
			>
				<Spin spinning={props.loading}>
					{error && <Alert type="error" message={error} />}

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
								<Select
									onChange={setValue}
									placeholder={t('form.viewer_amount_select.placeholder')}
									style={{ width: '100%' }}
								>
									{viewers_amount.map(amount => (
										<Select.Option value={amount}>{amount}</Select.Option>
									))}
								</Select>
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
								<Select
									onChange={setValue}
									placeholder={t('form.limit_mins_viewers.placeholder')}
									style={{ width: '100%' }}
								>
									{limits_mins.map(amount => (
										<Select.Option value={amount}>{amount}</Select.Option>
									))}
								</Select>
							</FormElement>
						),
					})}

					{props.form.field<string>({
						name: 'note',
						require: t('form.note_input.validatingErrorMessage'),
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
					})}

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
				</Spin>
			</Modal>
		)
	}),
)
