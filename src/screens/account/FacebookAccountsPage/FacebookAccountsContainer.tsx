import Card from 'antd/lib/card'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { CreateUpdateAccountModal } from '../CreateUpdateAccountModal'
import { ViewAccountModal } from '../ViewAccountModal'
import { FacebookAccountsPresentation } from './FacebookAccountsPresentation'

const query = graphql`
	query FacebookAccountsContainerQuery {
		facebook_accounts {
			edges {
				node {
					id
					name
					live
				}
			}
		}
	}
`

export const FacebookAccountsContainer = () => {
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

	const [modalViewAccountIsVisible, setModalViewAccountIsVisible] = useState<
		boolean
	>(false)

	const [
		modalCreateUpdateAccountIsVisible,
		setModalCreateUpdateAccountIsVisible,
	] = useState<boolean>(false)

	const [viewingAccount, setViewingAccount] = useState<{
		id: string
		name: string
	} | null>(null)

	const [modalMode, setModalMode] = useState<'create' | 'update'>('create')

	return (
		<QueryRenderer
			environment={RelayEnvironment}
			query={query}
			variables={{}}
			render={rs => (
				<Card title={<BreadCrumb />} style={{ minHeight: '100%' }}>
					{modalViewAccountIsVisible && (
						<ViewAccountModal
							onClose={() => setModalViewAccountIsVisible(false)}
							userInfo={viewingAccount}
							onUpdate={() => setModalCreateUpdateAccountIsVisible(true)}
							onChangeModeModal={(mode: 'create' | 'update') =>
								setModalMode(mode)
							}
						/>
					)}
					{modalCreateUpdateAccountIsVisible && (
						<CreateUpdateAccountModal
							onClose={() => setModalCreateUpdateAccountIsVisible(false)}
							mode={modalMode}
						/>
					)}
					<FacebookAccountsPresentation
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
						onOpenViewAccountModal={userInfo => {
							setViewingAccount(userInfo)
							setModalViewAccountIsVisible(true)
						}}
						fabIsVisble={
							!modalViewAccountIsVisible && !modalCreateUpdateAccountIsVisible
						}
					/>
				</Card>
			)}
		/>
	)
}
