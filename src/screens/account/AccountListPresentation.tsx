import { Avatar, Card, Col, List, Row, notification } from 'antd'
import React, { useState } from 'react'
import { AccountActions } from './AccountActions'
import { AccountStatistic } from './AccountStatistic'
import { AsyncForEach } from '../../helpers/ArrayLoop'
import { delete_facebook_account } from '../../graphql/delete_facebook_account'

interface AccountListPresentationProps {
	loading: boolean
	accounts: Array<{ id: string; name: string }>
	selectedAccounts: string[]
	onSelectAccount: (accounts: Array<string>) => void
	onOpenViewAccountModal: (id: string) => void
	onOpenCreateUpdateModal: Function
	onChangeModeModal: Function
}

export const AccountListPresentation = (
	props: AccountListPresentationProps,
) => {
	const isSelectingAllAccounts =
		props.selectedAccounts.length === props.accounts.length && !!props.accounts.length

	const [removingAccount, setRemovingAccount] = useState<boolean>(false)

	const removeSelectedAccount = () => {
		setRemovingAccount(true)
		AsyncForEach<string, void>(
			props.selectedAccounts,
			async id => {
				await delete_facebook_account(id)
			},
		)
		setRemovingAccount(false)
		props.onSelectAccount([])
		notification.success(
			{
				message: `Operation: Delete account${props.selectedAccounts.length > 1 ? 's' : ''}`,
				description: 'Successfully',
			}
		)
	}

	return (
		<>
			<AccountActions
				removeable={!!props.selectedAccounts.length}
				onChangeSelectedAccounts={() =>
					isSelectingAllAccounts
						? props.onSelectAccount([])
						: props.onSelectAccount([
							...props.accounts.map(account => account.id),
						])
				}
				isSelectingAllAccounts={isSelectingAllAccounts}
				onOpenCreateUpdateModal={props.onOpenCreateUpdateModal}
				onChangeModeModal={props.onChangeModeModal}
				removingAccount={removingAccount}
				onRemoveSelectedAccounts={() => removeSelectedAccount()}
			/>
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
				dataSource={props.accounts}
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
