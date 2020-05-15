/* eslint-disable @typescript-eslint/camelcase */
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
import Modal from 'antd/lib/modal'
import Spin from 'antd/lib/spin'
import Alert from 'antd/lib/alert'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Tag from 'antd/lib/tag'
import Icon from 'antd/lib/icon'
import { notification } from 'antd'
import Button from 'antd/lib/button'
import { isMobileOnly } from 'react-device-detect'
import { range } from '../../../helpers/utils'

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

		const completingBuffViewersTimes: number[] = [...range(0, 10)]

		const submit = () =>
			props.form.submit(async data => {
				set_error(null)
				set_loading(true)
				try {
					const delay = ~~(data.completing_minutes / data.amount) * 60 * 1000
					delete data.completing_minutes
					const inputData = {
						...data,
						note: 'add_from_web',
					}
					await create_buff_viewers_livestream(delay, inputData)
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
				style={{ top: isMobileOnly ? 0 : 50 }}
			>
				<Spin spinning={props.loading}>
					{props.form.field({
						name: 'id',
						require: t('form.facebook_video_input.validatingErrorMessage'),
						render: ({ error, setValues }) => (
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
											id: info.video_id,
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
						render: ({ error, setValue, value }) => (
							<FormElement
								label={t('form.viewer_amount_select.title')}
								icon="eye"
								error={error}
							>
								<BuffViewersLivestreamSystemStatus />
								<Row>
									{' '}
									<Col>
										{[
											50,
											100,
											150,
											200,
											250,
											300,
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
											5000,
										].map(amount => (
											<Button
												style={{ margin: 5, width: 100 }}
												type={amount == value ? 'primary' : 'dashed'}
												onClick={() => setValue(amount)}
											>
												{amount}
											</Button>
										))}
									</Col>{' '}
								</Row>
							</FormElement>
						),
					})}

					{props.form.field<number>({
						name: 'completing_minutes',
						require: 'Please select completing time',
						initalValue: 0,
						render: ({ error, setValue, value }) => (
							<FormElement
								label="Thời gian hoàn thành"
								icon="clock-circle"
								require
								error={error}
							>
								<Row>
									{' '}
									<Col>
										{completingBuffViewersTimes.map(time => (
											<Button
												style={{ margin: 5, width: 100 }}
												type={time == value ? 'primary' : 'dashed'}
												onClick={() => setValue(time)}
											>
												{`${time} ${time == 1 ? 'minute' : 'minutes'}`}
											</Button>
										))}
									</Col>{' '}
								</Row>
							</FormElement>
						),
					})}

					{props.form.field<number>({
						name: 'limit_mins',
						require: t('form.limit_mins_viewers.validatingErrorMessage'),
						render: ({ setValue, value }) => (
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
