import { notification } from 'antd'
import Alert from 'antd/lib/alert'
import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import Popconfirm from 'antd/lib/popconfirm'
import Row from 'antd/lib/row'
import Statistic from 'antd/lib/statistic'
import React, { useState } from 'react'
import { delete_facebook_account } from '../../graphql/delete_facebook_account'

export type ViewAccountModalProps = {
	onClose: Function
	userInfo: { id: string; name: string }
	onUpdate: Function
	onChangeModeModal: Function
}

export const ViewAccountModal = (props: ViewAccountModalProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const removeFacebookAccount = async (id: string) => {
		setError('')
		set_loading(true)
		try {
			await delete_facebook_account(id)
			props.onClose()
			notification.success({
				message: 'Operation: Delete account',
				description: 'Successfully',
			})
		} catch (message) {
			setError(message)
		}
		set_loading(false)
	}

	return (
		<Modal
			visible
			title="Account information"
			onCancel={() => props.onClose()}
			footer={null}
			onOk={() => {
				props.onClose()
				props.onChangeModeModal('update')
				props.onUpdate()
			}}
		>
			{error && (
				<Alert message={error} type="error" style={{ marginBottom: 15 }} />
			)}
			<Row gutter={16} type="flex" align="middle">
				<Col xs={6}>
					<Avatar
						style={{ width: '100%', height: 'auto' }}
						src={`http://graph.facebook.com/${props.userInfo?.id}/picture?type=large`}
					/>
				</Col>
				<Col xs={18} style={{ verticalAlign: 'middle' }}>
					<div>{props.userInfo?.name}</div>
					<div>
						<Row>
							<Col sm={10} xs={24}>
								<Button
									type="primary"
									style={{ marginTop: 15 }}
									onClick={() => {
										props.onClose()
										props.onChangeModeModal('update')
										props.onUpdate()
									}}
								>
									Update account
								</Button>
							</Col>
							<Col sm={10} xs={24}>
								<Popconfirm
									title="Are you sure delete this account?"
									okText="Yes"
									cancelText="No"
									onConfirm={() => removeFacebookAccount(props.userInfo?.id)}
								>
									<Button
										type="danger"
										loading={loading}
										style={{ marginTop: 15 }}
									>
										Delete account
									</Button>
								</Popconfirm>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			<Divider />
			<Row gutter={16}>
				<Col xs={12} md={6}>
					<Statistic
						title="Friends"
						value={99}
						prefix={<Icon type="user" />}
						suffix="+"
					/>
				</Col>
				<Col xs={12} md={6}>
					<Statistic
						title="Pages"
						value={99}
						prefix={
							<Avatar src="https://www.socialmediaexaminer.com/wp-content/uploads/2014/07/kl-facebook-pages-app-logo.jpg" />
						}
						suffix="+"
					/>
				</Col>
				<Col xs={12} md={6}>
					<Statistic
						title="Groups"
						value={99}
						prefix={
							<Avatar src="https://www.codester.com/static/uploads/items/5415/icon.png" />
						}
						suffix="+"
					/>
				</Col>
				<Col xs={12} md={6}>
					<Statistic
						title="Ads"
						value={99}
						prefix={<Icon type="notification" />}
						suffix="+"
					/>
				</Col>
			</Row>
			<Divider />
		</Modal>
	)
}
