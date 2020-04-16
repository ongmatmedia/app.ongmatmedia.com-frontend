import Avatar from 'antd/lib/avatar'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { Action, Fab } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'
import { delete_facebook_account } from '../../../graphql/delete_facebook_account'
import { AsyncForEach } from '../../../helpers/ArrayLoop'
import { AccountStatistic } from '../AccountStatistic'
import { notification } from 'antd'

interface FacebookAccountsPresentationProps {
	loading: boolean
	accounts: Array<{ id: string; name: string }>
	selectedAccounts: string[]
	fabIsVisble: boolean
	onSelectAccount: (accounts: Array<string>) => void
	onOpenViewAccountModal: (id: string) => void
	onOpenCreateUpdateModal: Function
	onChangeModeModal: Function
}

export const FacebookAccountsPresentation = (
	props: FacebookAccountsPresentationProps,
) => {
	const isSelectingAllAccounts =
		props.selectedAccounts.length === props.accounts.length &&
		!!props.accounts.length

	const [removingAccount, setRemovingAccount] = useState<boolean>(false)

	const removeSelectedAccount = () => {
		setRemovingAccount(true)
		AsyncForEach<string, void>(props.selectedAccounts, async id => {
			await delete_facebook_account(id)
		})
		setRemovingAccount(false)
		props.onSelectAccount([])
		notification.success({
			message: `Operation: Delete account${
				props.selectedAccounts.length > 1 ? 's' : ''
			}`,
			description: 'Successfully',
		})
	}

	return (
		<>
			{props.fabIsVisble && (
				<Fab
					mainButtonStyles={{ backgroundColor: '#1890ff' }}
					icon={<Icon type="tool" />}
					event="click"
				>
					<div className="add-account">
						<Action
							text="Add account"
							children={<Icon type="plus" />}
							onClick={() => {
								props.onChangeModeModal('create')
								props.onOpenCreateUpdateModal()
							}}
							style={{ backgroundColor: '#1890ff' }}
						/>
					</div>
					{props.selectedAccounts.length !== 0 && (
						<div className="delete-account">
							<Action
								text="Delete account"
								children={
									<Icon type={removingAccount ? 'loading' : 'delete'} />
								}
								style={{ backgroundColor: '#1890ff' }}
								onClick={() => removeSelectedAccount()}
							/>
						</div>
					)}
					<div className="select-account">
						<Action
							text={
								isSelectingAllAccounts
									? 'Deselect all accounts'
									: 'Select all accounts'
							}
							onClick={() =>
								isSelectingAllAccounts
									? props.onSelectAccount([])
									: props.onSelectAccount([
											...props.accounts.map(account => account.id),
									  ])
							}
							children={
								<>
									<Icon type="check-square" />
								</>
							}
							style={{ backgroundColor: '#1890ff' }}
						/>
					</div>
				</Fab>
			)}
			<AccountStatistic accounts={props.accounts} />
			<List
				grid={{
					gutter: 10,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
					xl: 6,
					xxl: 8,
				}}
				dataSource={[...props.accounts]}
				loading={props.loading}
				renderItem={({ id, name }) => (
					<List.Item>
						<Card
							bodyStyle={{
								padding: 10,
								paddingBottom: 0,
								border: props.selectedAccounts.includes(id)
									? '2px solid #1890ff'
									: '2px solid white',
							}}
							loading={name == null}
						>
							<Row
								type="flex"
								justify="start"
								align="middle"
								style={{ paddingBottom: 10 }}
							>
								<Col
									xs={12}
									style={{ cursor: 'pointer' }}
									onClick={() =>
										props.selectedAccounts.includes(id)
											? props.onSelectAccount([
													...props.selectedAccounts.filter(
														idAccount => idAccount !== id,
													),
											  ])
											: props.onSelectAccount([...props.selectedAccounts, id])
									}
								>
									<Avatar
										src={`http://graph.facebook.com/${id}/picture?type=large`}
										size={60}
									/>
								</Col>
								<Col
									xs={12}
									style={{ overflow: 'auto', cursor: 'pointer' }}
									onClick={() =>
										props.selectedAccounts.length === 0 &&
										props.onOpenViewAccountModal(id)
									}
								>
									<span>{name}</span>
								</Col>
							</Row>
						</Card>
					</List.Item>
				)}
			/>
		</>
	)
}
