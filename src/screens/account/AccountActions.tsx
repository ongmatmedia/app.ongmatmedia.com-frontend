import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Col from 'antd/lib/col'
import Popconfirm from 'antd/lib/popconfirm'
import Row from 'antd/lib/row'
import React from 'react'

export const AccountActions = (props: {
	removeable: boolean
	onChangeSelectedAccounts: Function
	isSelectingAllAccounts: boolean
	onOpenCreateUpdateModal: Function
	onChangeModeModal: Function
	removingAccount: boolean
	onRemoveSelectedAccounts: Function
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
				<Popconfirm
					title="Are you sure delete that account(s)?"
					okText="I'm sure"
					cancelText="No"
					onConfirm={() => props.onRemoveSelectedAccounts()}
				>
					<Button
						type="danger"
						icon="delete"
						disabled={!props.removeable}
						style={{ marginTop: 10 }}
						loading={props.removingAccount}
					>
						Remove accounts
					</Button>
				</Popconfirm>
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
