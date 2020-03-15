import { Button, Checkbox, Col, Row } from 'antd'
import React from 'react'

export const AccountActions = (props: {
	removeable: boolean
	onChangeSelectedAccounts: Function
	isSelectingAllAccounts: boolean
	onOpenCreateUpdateModal: Function
	onChangeModeModal: Function
}) => {
	return (
		<Row style={{ marginBottom: 20 }} gutter={8}>
			<Col md={16} xs={24}>
				<Button
					type="primary"
					icon="plus"
					onClick={() => {
						props.onChangeModeModal('create')
						props.onOpenCreateUpdateModal()
					}}
					style={{ marginRight: 15, marginTop: 10 }}
				>
					Add account
				</Button>
				<Button
					type="danger"
					icon="delete"
					disabled={!props.removeable}
					style={{ marginTop: 10 }}
				>
					Remove accounts
				</Button>
			</Col>
			<Col md={{ offset: 4, span: 4 }} xs={24} style={{ marginTop: 10 }}>
				<Checkbox
					defaultChecked={false}
					checked={props.isSelectingAllAccounts}
					onChange={e => props.onChangeSelectedAccounts()}
				>
					{props.isSelectingAllAccounts
						? 'Deselect all accounts'
						: 'Select all accounts'}
				</Checkbox>
			</Col>
		</Row>
	)
}
