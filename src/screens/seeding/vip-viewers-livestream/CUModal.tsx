import {
	Alert,
	Avatar,
	Col,
	Form as AntdForm,
	Icon,
	Input,
	message,
	Modal,
	notification,
	Row,
	Select,
	Spin,
	Switch,
	Tag,
} from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import React, { Fragment, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { create_vip_viewers_livestream } from '../../../graphql/create_vip_viewers_livestream'
import { update_vip_viewers_livestream } from '../../../graphql/update_vip_viewers_livestream'
import { VipViewersLivestream, User } from '../../../types'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { withForm } from '../../../libs/Form'
import { FacebookObjectInput } from './FacebookObjectInput'

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
	vip?: VipViewersLivestream
	onClose: Function
}

export type CUModalGraphqlData = { me: User; vip: VipViewersLivestream }

export const CUModal = GraphQLWrapper<CUModalGraphqlData, CUModalProps>(
	query,
	{},
	withForm(props => {
		const [editing_uid, set_editing_uid] = useState<boolean>(
			props.mode == 'create',
		)
		const [error, set_error] = useState<string | null>(null)
		const [loading, set_loading] = useState<boolean>(false)

		const { t } = useTranslation('cu_modal')

		const { form } = props

		const submit = () =>
			form.submit(async data => {
				set_error(null)
				try {
					set_loading(true)
					if (props.mode == 'create') {
						await create_vip_viewers_livestream({ ...data, active: true })
						notification.success({ message: 'Create success' })
					} else {
						await update_vip_viewers_livestream(data)
						notification.success({ message: 'Update success' })
					}
					set_error(null)
					set_loading(false)
					set_editing_uid(true)
					props.onClose()
				} catch (e) {
					set_error(e.message)
					set_loading(false)
				}
			})

		const SelectFormItem = (props: {
			icon: string
			name: string
			require: string
			title: string
			values: any[]
			render: Function
			placeholder: string
		}) =>
			form.field<number>({
				name: props.name,
				require: props.require,
				render: ({ error, setValue }) => (
					<AntdForm.Item>
						<Row type="flex" justify="space-between" align="middle">
							<Col>
								<h3>
									<Icon type={props.icon} /> {props.title}
								</h3>
							</Col>
						</Row>
						{error && <Alert type="error" message={error} />}
						<Select onChange={setValue} placeholder={props.placeholder}>
							{props.values.map(value => (
								<Select.Option value={value}>
									{props.render(value)}
								</Select.Option>
							))}
						</Select>
					</AntdForm.Item>
				),
			}) as JSX.Element

		return (
			<Modal
				visible={true}
				onOk={() => submit()}
				onCancel={() => props.onClose()}
				destroyOnClose
				closable={false}
				okButtonProps={{ loading }}
				title={
					props.mode == 'create' ? t('title.creating') : t('title.editing')
				}
			>
				<Spin spinning={props.loading}>
					<AntdForm>
						{error && <Alert type="error" message={error} />}
						{props.mode == 'update' &&
							props.form.field<boolean>({
								name: 'active',
								render: ({ setValue }) => (
									<AntdForm.Item>
										<Row type="flex" justify="space-between" align="middle">
											<Col>
												{' '}
												<h3>
													<Icon type="clock-circle" /> Active status
												</h3>{' '}
											</Col>
											<Col>
												{props.vip && props.vip.active ? (
													<Tag color={'rgb(21, 100, 42)'}>
														Running <Icon type="sync" spin />
													</Tag>
												) : (
													<Tag color={'#c01922'}> Stopped </Tag>
												)}
											</Col>
										</Row>
										<Switch
											defaultChecked={props.vip && props.vip.active}
											onChange={checked => setValue(checked)}
										/>
									</AntdForm.Item>
								),
							})}
						{props.form.field({
							name: 'id',
							require: t('form.facebook_object_input.validatingErrorMessage'),
							initalValue:
								props.mode == 'create' ? undefined : props.vip && props.vip.id,
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
													src={`http://graph.facebook.com/${props.form.data.id}/picture?type=large`}
													size={60}
												/>
											</Col>
											<Col span={14}>
												<div style={{ padding: 10, flexWrap: 'wrap' }}>
													{props.mode == 'create'
														? props.form.data.name
														: props.vip && props.vip.name}
												</div>
											</Col>
											<Col span={props.mode == 'create' ? 6 : 4}>
												{props.mode == 'create' && (
													<Icon
														type="edit"
														style={{
															color: 'black',
															marginRight: 10,
															fontSize: 20,
															cursor: 'pointer',
														}}
														onClick={() => set_editing_uid(true)}
													/>
												)}
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
												</CopyToClipboard>
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
												/>
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
												/>
											</Col>
										</Row>
									)}

									{editing_uid && (
										<FacebookObjectInput
											placeholder={t('form.facebook_object_input.placeholder')}
											onSelect={({ name, image, type, id }) => {
												// if (type == LivestreamFacebookTargetType.group) return
												setValues({ id, name })
												set_editing_uid(false)
											}}
											onError={() => Modal.error({ title: 'Invaild UID' })}
										/>
									)}
								</AntdForm.Item>
							),
						})}
						{props.form.field<number>({
							name: 'amount',
							require:
								props.mode == 'create'
									? t('form.viewer_amount_select.validatingErrorMessage')
									: undefined,
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
										{props.mode == 'create' ? (
											<Col>
												<h3>
													<Icon type="eye" />{' '}
													{t('form.viewer_amount_select.title.creating')}{' '}
													<Tag
														style={{
															background: '#fff',
															borderStyle: 'dashed',
														}}
													>
														{' '}
														{t('form.viewer_amount_select.rule')}{' '}
													</Tag>
												</h3>
											</Col>
										) : (
											<Fragment>
												<Col>
													<h3>
														<Icon type="eye" />{' '}
														{t('form.viewer_amount_select.title.editing')}
													</h3>
												</Col>
												<Col>
													{' '}
													<Tag color="#108ee9">
														Current {props.vip && props.vip.amount} viewers
													</Tag>
												</Col>
											</Fragment>
										)}
									</Row>
									{error && <Alert type="error" message={error} />}
									<Select
										onChange={setValue}
										placeholder={t('form.viewer_amount_select.placeholder')}
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
											<Select.Option value={amount}>
												{amount}{' '}
												{props.vip &&
													props.vip.amount == amount &&
													' ** (not change)'}
											</Select.Option>
										))}
									</Select>
								</AntdForm.Item>
							),
						})}

						<SelectFormItem
							icon="eye"
							name="bought_mins"
							placeholder="bought_mins"
							render={v => v}
							values={[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30]}
							require="Require"
							title="bought_mins"
						/>

						<SelectFormItem
							icon="eye"
							name="auto_disable_after"
							placeholder="auto_disable_after"
							render={v => v}
							values={[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30]}
							require="Require"
							title="auto_disable_after"
						/>

						{props.form.field<number>({
							name: 'parallel',
							require: 'Require',
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
										{props.mode == 'create' ? (
											<Col>
												<h3>
													<Icon type="calendar" /> parallel
													<Tag
														style={{
															background: '#fff',
															borderStyle: 'dashed',
														}}
													>
														{t('form.bought_mins.rule')}
													</Tag>
												</h3>
											</Col>
										) : (
											<Fragment>
												<Col>
													<h3>
														<Icon type="eye" />{' '}
														{t('form.bought_mins.title.editing')}
													</h3>
												</Col>
												<Col></Col>
											</Fragment>
										)}
									</Row>
									{error && <Alert type="error" message={error} />}
									<Select placeholder="auto_disable_after" onChange={setValue}>
										{new Array(100).fill(0).map((_, n) => (
											<Select.Option value={n + 1}>{n + 1}</Select.Option>
										))}
									</Select>
								</AntdForm.Item>
							),
						})}

						{props.form.field<string>({
							name: 'note',
							require: t('form.note_input.validatingErrorMessage'),
							initalValue:
								props.mode == 'update'
									? props.vip && props.vip.note
									: undefined,
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
													<Icon type="form" /> {t('form.note_input.title')}{' '}
													<Tag
														style={{
															background: '#fff',
															borderStyle: 'dashed',
														}}
													>
														{' '}
														{t('form.note_input.rule')}{' '}
													</Tag>
												</h3>
											</Col>
											<Col></Col>
										</Row>
										{error && <Alert type="error" message={error} />}
										<Input
											placeholder={t('form.note_input.placeholder')}
											value={value}
											onChange={e => setValue(e.target.value)}
											allowClear
										/>
									</AntdForm.Item>
								)
							},
						})}
					</AntdForm>
				</Spin>
			</Modal>
		)
	}),
)