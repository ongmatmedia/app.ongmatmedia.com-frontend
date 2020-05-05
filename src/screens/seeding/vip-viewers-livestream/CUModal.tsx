import {Alert, Avatar, Button, Card, Col, Form as AntdForm, Icon, message, Modal, notification, Row, Spin, Switch, Tag} from 'antd'
import {graphql} from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {isMobile, isMobileOnly, isTablet} from 'react-device-detect'
import {useTranslation} from 'react-i18next'
import {FormElement} from '../../../components/form/FormElement'
import {OrderInfo} from '../../../components/OrderInfo'
import {create_vip_viewers_livestream} from '../../../graphql/create_vip_viewers_livestream'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {range} from '../../../helpers/utils'
import {withForm} from '../../../libs/Form'
import {User, VipViewersLivestream} from '../../../types'
import {FacebookObjectInput} from './FacebookObjectInput'
import {update_vip_viewers_livestream} from '../../../graphql/update_vip_viewers_livestream'

const query = graphql`
	query CUModalQuery {
		me {
			id
			balance
			price_percent
			pricing {
				vip_viewers_livestream
			}
		}
	}
`
const IconFont = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

export type CUModalProps = {
	mode: 'create' | 'update'
	vip?: VipViewersLivestream | null
	onClose: Function
}

export type CUModalGraphqlData = {me: User; vip: VipViewersLivestream}

export const CUModal = GraphQLWrapper<CUModalGraphqlData, CUModalProps>(
	query,
	{},
	withForm(props =>
	{
		const [editing_uid, set_editing_uid] = useState<boolean>(
			props.mode == 'create',
		)
		const [error, set_error] = useState<string | null>(null)
		const [loading, set_loading] = useState<boolean>(false)

		const {t} = useTranslation('cu_modal')

		const {form} = props

		const submit = () =>
			form.submit(
				async (data: {
					facebook_target: {id: string; name: string},
					amount: number,
					max_duration: number,
					max_live_per_day: number,
					parallel: number,
					days: number,
					active: boolean
				}) =>
				{
					set_error(null)
					try
					{
						set_loading(true)
						if (props.mode == 'create')
						{
							await create_vip_viewers_livestream(data.days, {
								amount: data.amount,
								id: data.facebook_target.id,
								name: data.facebook_target.name,
								max_duration: data.max_duration,
								parallel: data.parallel,
								max_live_per_day: data.max_live_per_day
							})
							notification.success({message: 'Operation: Create vip subscription'})
						} else
						{
							await update_vip_viewers_livestream(
								data.days, 
								{
									amount: data.amount,
									max_duration: data.max_duration,
									max_live_per_day: data.max_live_per_day,
									parallel: data.parallel,
									active: data.active
								},
								data.facebook_target.id,
							)
							notification.success({message: 'Operation: Update vip subscription'})
						}
						set_error(null)
						set_loading(false)
						set_editing_uid(true)
						props.onClose()
					} catch (e)
					{
						set_error(e)
						set_loading(false)
					}
				},
			)

		return (
			<Modal
				visible={true}
				onOk={() => submit()}
				onCancel={() => props.onClose()}
				destroyOnClose
				closable={true}
				style={{top: isMobile ? 0 : 20, width: isMobile ? '100%' : '80%'}}
				okButtonProps={{loading}}
				title={
					props.mode == 'create' ? t('title.creating') : t('title.editing')
				}
				width={isMobileOnly ? '100%' : isTablet ? '80%' : '50%'}
			>
				<Spin
					spinning={props.loading}
					indicator={<Icon type="loading" style={{fontSize: 24}} />}
				>
					<AntdForm>
						{props.mode == 'update' &&
							props.form.field<boolean>(
								{
									name: 'active',
									render: ({setValue}) => (
										<AntdForm.Item>
											<Row type="flex" justify="space-between" align="middle">
												<Col>
													{' '}
													<span>
														<Icon type="clock-circle" /> Active status
													</span>
													<Switch
														defaultChecked={props.vip?.active}
														onChange={checked => setValue(checked)}
														style={{display: 'inline-block', marginLeft: 10}}
													/>
													{' '}
												</Col>
												<Col>
													{props.vip?.active ? (
														<Tag color='rgb(21, 100, 42)'>
															Running {' '} <Icon type="sync" spin />
														</Tag>
													) : (
															<Tag color='#c01922'> Stopped </Tag>
														)}
												</Col>
											</Row>
										</AntdForm.Item>
									),
								}
							)
						}
						{props.form.field<{id: string; name: string} | null>({
							name: 'facebook_target',
							require: t('form.facebook_object_input.validatingErrorMessage'),
							initalValue:
								props.mode == 'create'
									? null
									: {id: props.vip?.id, name: props.vip?.name},
							render: ({error, setValue, value}) => (
								<AntdForm.Item>
									<Row type="flex" justify="space-between" align="middle">
										<Col>
											<h3>
												<Icon type="user" />{' '}
												{t('form.facebook_object_input.title')}{' '}
												{props.mode == 'create' && (
													<Tag
														style={{
															background: '#fff',
															borderStyle: 'dashed',
														}}
													>
														{' '}
														{t('form.facebook_object_input.rule')}{' '}
													</Tag>
												)}
											</h3>
										</Col>
									</Row>
									{error && <Alert type="error" message={error} />}
									{!!value?.id && !!value?.name && (
										<Card
											style={{marginTop: 10}}
											actions={
												props.mode == 'create' ? [
													<Icon
														type="edit"
														style={{
															color: 'black',
															marginRight: 10,
															fontSize: 20,
															cursor: 'pointer',
														}}
														onClick={() => set_editing_uid(true)}
													/>,
													<CopyToClipboard
														text={props.vip ? props.vip.id : props.form.data.id}
														onCopy={() => message.info('UID copied')}
													>
														<Icon
															type="copy"
															style={{
																color: 'black',
																marginRight: 10,
																fontSize: 20,
																cursor: 'pointer',
															}}
														/>
													</CopyToClipboard>,
													<Icon
														type="message"
														style={{
															color: 'black',
															marginRight: 10,
															fontSize: 20,
															cursor: 'pointer',
														}}
														onClick={() =>
															window.open(
																`https://m.me/${
																props.vip ? props.vip.id : props.form.data.id
																}`,
															)
														}
													/>,
													<IconFont
														type="icon-facebook"
														style={{
															color: 'black',
															fontSize: 20,
															cursor: 'pointer',
														}}
														onClick={() =>
															window.open(
																`https://fb.com/${
																props.vip ? props.vip.id : props.form.data.id
																}`,
															)
														}
													/>,
												] : [
														<CopyToClipboard
															text={props.vip ? props.vip.id : props.form.data.id}
															onCopy={() => message.info('UID copied')}
														>
															<Icon
																type="copy"
																style={{
																	color: 'black',
																	marginRight: 10,
																	fontSize: 20,
																	cursor: 'pointer',
																}}
															/>
														</CopyToClipboard>,
														<Icon
															type="message"
															style={{
																color: 'black',
																marginRight: 10,
																fontSize: 20,
																cursor: 'pointer',
															}}
															onClick={() =>
																window.open(
																	`https://m.me/${
																	props.vip ? props.vip.id : props.form.data.id
																	}`,
																)
															}
														/>,
														<IconFont
															type="icon-facebook"
															style={{
																color: 'black',
																fontSize: 20,
																cursor: 'pointer',
															}}
															onClick={() =>
																window.open(
																	`https://fb.com/${
																	props.vip ? props.vip.id : props.form.data.id
																	}`,
																)
															}
														/>,
													]
											}
										>
											<Card.Meta
												avatar={
													<Avatar src={`http://graph.facebook.com/${value?.id}/picture?type=large`} size={40} />
												}
												title={value?.name}
												description={`UID: ${value?.id}`}
											/>
										</Card>
									)}
									{editing_uid && (
										<FacebookObjectInput
											placeholder={t('form.facebook_object_input.placeholder')}
											onSelect={({url}) =>
											{
												// if (type == LivestreamFacebookTargetType.group) return
												setValue({id: '100005137867313', name: 'Dang Tien Nguyen'})
												set_editing_uid(false)
											}}
											onError={() => Modal.error({title: 'Invaild UID'})}
										/>
									)}
								</AntdForm.Item>
							),
						})}
						{props.form.field<number>({
							name: 'amount',
							require: 'Please choose viewers amount',
							initalValue: props.vip?.amount,
							render: ({setValue, value, error}) => (
								<FormElement label="Viewers amount" icon="eye" require>
									{error && <Alert type="error" message={error} />}
									{[50, 100, 150, 200, 250, 300, 400, 500].map(amount => (
										<Button
											style={{margin: 5, width: 100}}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{amount}
										</Button>
									))}
								</FormElement>
							),
						})}

						{props.form.field<number>({
							name: 'days',
							require: 'Please choose period',
							initalValue: Math.ceil((props.vip?.end_time - Date.now()) / 86400 / 1000),
							render: ({setValue, value, error}) => (
								<FormElement label="Period" icon="calendar" require>
									{error && <Alert type="error" message={error} />}
									{[1, 3, 7, 14, 30, 45, 60, 90, 120].map(amount => (
										<Button
											style={{margin: 5, width: 100}}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{`${amount} ${amount > 1 ? 'days' : 'day'}`}
										</Button>
									))}
								</FormElement>
							),
						})}

						{props.form.field<number>({
							name: 'parallel',
							require: 'Please choose number of parallel lives',
							initalValue: props.vip?.parallel ?? 1,
							render: ({error, setValue, value}) => (
								<FormElement label="Parallel lives" icon="retweet" require>
									{error && <Alert type="error" message={error} />}
									{[...range(1, 10)].map(amount => (
										<Button
											style={{margin: 5, width: 100}}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{amount}
										</Button>
									))}
								</FormElement>
							),
						})}
						{props.form.field<number>({
							name: 'max_live_per_day',
							require: 'Please choose number of max lives per day',
							initalValue: props.vip?.max_live_per_day ?? 1,
							render: ({error, setValue, value}) => (
								<FormElement
									label="Max lives per day"
									icon="video-camera"
									require
								>
									{error && <Alert type="error" message={error} />}
									{[...range(1, 3)].map(amount => (
										<Button
											style={{margin: 5, width: 100}}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{amount}
										</Button>
									))}
								</FormElement>
							),
						})}
						{props.form.field<number>({
							name: 'max_duration',
							require: 'Please choose max length each video',
							initalValue: props.vip?.max_duration,
							render: ({error, setValue, value}) => (
								<FormElement
									label="Max length per video"
									icon="clock-circle"
									require
								>
									{error && <Alert type="error" message={error} />}
									{[30, 60, 90, 120, 150, 180].map(amount => (
										<Button
											style={{margin: 5, width: 100}}
											type={amount == value ? 'primary' : 'dashed'}
											onClick={() => setValue(amount)}
										>
											{`${amount} minutes`}
										</Button>
									))}
								</FormElement>
							),
						})}
					</AntdForm>
					{props.data &&
						[
							'amount',
							'days',
							'parallel',
							'max_live_per_day',
							'max_duration',
						].every(key => form.data.hasOwnProperty(key)) && (
							<>
								<OrderInfo
									balance={props.data.me.balance}
									order={
										form.data.parallel == 1
											? [
												{amount: form.data.amount, unit: 'viewers'},
												{
													amount: form.data.days,
													unit: `day${form.data.days == 1 ? '' : 's'}`,
												},
												{
													amount: form.data.max_live_per_day,
													unit: `live${
														form.data.max_live_per_day == 1 ? '' : 's'
														} per day`,
												},
												{
													amount: form.data.max_duration,
													unit: 'minutes per video',
												},
												{
													amount:
														props.data.me.pricing?.vip_viewers_livestream,
													unit: 'credit/viewer',
												},
											]
											: [
												{amount: form.data.amount, unit: 'viewers'},
												{amount: form.data.days, unit: 'days'},
												{
													amount: form.data.max_live_per_day,
													unit: `live${
														form.data.max_live_per_day == 1 ? '' : 's'
														} per day`,
												},
												{
													amount: form.data.parallel,
													unit: 'livestreams in parallel',
												},
												{
													amount: form.data.max_duration,
													unit: 'minutes per video',
												},
												{
													amount:
														props.data.me.pricing?.vip_viewers_livestream,
													unit: 'credit/viewer',
												},
											]
									}
								/>
							</>
						)}
					{error && (
						<Alert showIcon type="error" message={error} style={{marginTop: 15}} />
					)}
				</Spin>
			</Modal>
		)
	}),
)
