import { Modal } from 'antd'
import React, { useState } from 'react'

export type ViewAccountModalProps = {
	visible: boolean
	onClose: Function
	accountId: string
	onUpdate: Function
	onChangeModeModal: Function
}

export const ViewAccountModal = (props: ViewAccountModalProps) => {
	const [loading, set_loading] = useState<boolean>(false)

	return (
		<Modal
			visible={props.visible}
			title="Account information"
			okText="Edit account"
			onCancel={() => props.onClose()}
			onOk={() => {
				props.onClose()
				props.onChangeModeModal('update')
				props.onUpdate()
			}}
		>
			{props.accountId}
		</Modal>
	)
}
