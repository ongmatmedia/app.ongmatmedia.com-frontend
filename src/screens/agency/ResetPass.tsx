import { Alert, Col, Modal, Row, Tag } from 'antd'
import React, { useState } from 'react'
import { AutoSelectInput } from '../../components/AutoSelectInput'
import { User } from '../../types'
import { set_user_password } from '../../graphql/set_user_password'

export interface ResetPassModalProps {
	visible: boolean
	onClose: Function
	user: User
}

export const ResetPass = (props: ResetPassModalProps) => {
	const [value, set_value] = useState<string>('')
	const [loading, set_loading] = useState<boolean>(false)
	const [error, set_error] = useState<string | null>(null)

	const submit = async () => {
		if (value == '') return
		set_loading(true)
		set_error(null)
		try {
			await set_user_password(props.user.id, value)
			set_loading(false)
			props.onClose()
		} catch (e) { 
			set_error(e )
			set_loading(false)
		}
	}

	return (
		<Modal
			visible={props.visible}
			title="Set new pass for user"
			onCancel={() => props.onClose()}
			onOk={() => submit()}
			okButtonProps={{ loading }}
		>
			{error && <Alert type="error" message={error} />}
			<Row>
				<Col span={12}>Username</Col>
				<Col span={12}>
					<Tag color="blue">{props.user.username}</Tag>
				</Col>
			</Row>
			<Row style={{ marginTop: 10 }}>
				<Col span={12}>New password</Col>
				<Col span={12}>
					<AutoSelectInput
						value={value}
						onChange={e => set_value(e.target.value)}
					/>
				</Col>
			</Row>
		</Modal>
	)
}
