import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { CreateUpdateAccountModal } from '../CreateUpdateAccountModal'
import { ViewAccountModal } from '../ViewAccountModal'
import { FacebookAccountsPresentation } from './FacebookAccountsPresentation'
import { Card } from 'antd'
import { BreadCrumb } from '../../../components/common/BreadCrumb'

const query = graphql`
	query FacebookAccountsContainerQuery {
		facebook_accounts {
			edges {
				node {
					id
					name
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

	const [viewingAccount, setViewingAccount] = useState<string>()

	const [modalMode, setModalMode] = useState<'create' | 'update'>('create')

	return (
		<QueryRenderer
			environment={RelayEnvironment}
			query={query}
			variables={{}}
			render={rs => (
				<Card title={<BreadCrumb />} style={{ height: 'calc(100vh - 70px)' }}>
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
						onOpenViewAccountModal={id => {
							setViewingAccount(id)
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
