import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../graphql/RelayEnvironment'
import { AccountListPresentation } from './AccountListPresentation'
import { ViewAccountModal } from './ViewAccountModal'
import { CreateUpdateAccountModal } from './CreateUpdateAccountModal'

export const AccountListContainer = () => {
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

	const [modalViewAccountIsVisible, setModalViewAccountIsVisible] = useState<
		boolean
	>(false)

	const [
		modalCreateUpdateAccountIsVisible,
		setModalCreateUpdateAccountIsVisible,
	] = useState<boolean>(false)

	const [viewingAccount, setViewingAccount] = useState<string>()

	const [modalMode, setModalMode] = useState<'create' | 'update'>('create')

	return (
		<QueryRenderer
			environment={RelayEnvironment}
			query={graphql`
				query AccountListContainerQuery {
					facebook_accounts {
						edges {
							node {
								id
								name
							}
						}
					}
				}
			`}
			variables={{}}
			render={rs => (
				<>
					<ViewAccountModal
						visible={modalViewAccountIsVisible}
						onClose={() => setModalViewAccountIsVisible(false)}
						accountId={viewingAccount}
						onUpdate={() => setModalCreateUpdateAccountIsVisible(true)}
						onChangeModeModal={(mode: 'create' | 'update') =>
							setModalMode(mode)
						}
					/>
					<CreateUpdateAccountModal
						visible={modalCreateUpdateAccountIsVisible}
						onClose={() => setModalCreateUpdateAccountIsVisible(false)}
						accountId={viewingAccount}
						mode={modalMode}
					/>
					<AccountListPresentation
						loading={rs.props == null}
						accounts={
							rs.props
								? (rs.props as any).facebook_accounts.edges.map(el => el.node)
								: []
						}
						selectedAccounts={selectedAccounts}
						onOpenCreateUpdateModal={() =>
							setModalCreateUpdateAccountIsVisible(true)
						}
						onSelectAccount={accounts => setSelectedAccounts([...accounts])}
						onChangeModeModal={(mode: 'create' | 'update') =>
							setModalMode(mode)
						}
						onOpenViewAccountModal={id => {
							setViewingAccount(id)
							setModalViewAccountIsVisible(true)
						}}
						// accounts={[
						// 	{
						// 		id: '100005137867313',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// 	{
						// 		id: '100005137867314',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// 	{
						// 		id: '100005137867315',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// 	{
						// 		id: '100005137867316',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// 	{
						// 		id: '100005137867317',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// 	{
						// 		id: '100005137867318',
						// 		name: 'Dang Tien Nguyen',
						// 	},
						// ]}
					/>
				</>
			)}
		/>
	)
}
