import { notification, Skeleton } from 'antd'
import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { Fab } from 'react-tiny-fab'
import { delete_facebook_account } from '../../../graphql/delete_facebook_account'
import { AsyncForEach } from '../../../helpers/ArrayLoop'
import { AccountStatistic } from '../AccountStatistic'

interface FacebookAccountsPresentationProps {
	loading: boolean
	accounts: { id: string; name: string; live: boolean }[]
	selectedAccounts: string[]
	fabIsVisble: boolean
	onSelectAccount: (accounts: Array<string>) => void
	onOpenViewAccountModal: (userInfo: { id: string; name: string }) => void
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
					icon={<Icon type="plus" />}
					event="click"
					onClick={() => {
						props.onChangeModeModal('create')
						props.onOpenCreateUpdateModal()
					}}
				/>
			)}
			<AccountStatistic accounts={props.accounts} />
			<Row type="flex" justify="end" gutter={16}>
				<Col
					xs={24}
					sm={12}
					md={6}
					lg={5}
					xl={4}
					style={{ textAlign: 'right', marginTop: 10 }}
				>
					<Button
						type="danger"
						disabled={props.selectedAccounts.length == 0}
						style={{ width: '100%' }}
						onClick={() => removeSelectedAccount()}
					>
						<Icon type={removingAccount ? 'loading' : 'delete'} />
						{removingAccount
							? 'Loading'
							: `Delete ${props.selectedAccounts.length} accounts`}
					</Button>
				</Col>
				<Col
					xs={24}
					sm={12}
					md={6}
					lg={5}
					xl={4}
					style={{ textAlign: 'right', marginTop: 10 }}
				>
					<Button
						type="primary"
						style={{ width: '100%' }}
						onClick={() =>
							isSelectingAllAccounts
								? props.onSelectAccount([])
								: props.onSelectAccount([
										...props.accounts.map(account => account.id),
								  ])
						}
					>
						{isSelectingAllAccounts
							? 'Deselect all accounts'
							: 'Select all accounts'}
					</Button>
				</Col>
			</Row>
			{props.loading ? (
				<Skeleton active loading paragraph={{ rows: 2 }} />
			) : (
				<List
					style={{ marginTop: 10 }}
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
											props.onOpenViewAccountModal({ id, name })
										}
									>
										<span>{name}</span>
									</Col>
								</Row>
							</Card>
						</List.Item>
					)}
				/>
			)}
		</>
	)
}
