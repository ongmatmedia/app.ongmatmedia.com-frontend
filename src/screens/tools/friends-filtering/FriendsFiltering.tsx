import React, { useEffect } from 'react'
import Card from 'antd/lib/card'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { FriendsFilteringActions } from './components/FriendsFilteringActions'
import { FriendsFilteringTable } from './components/FriendsFilteringTable'
import { withFilterFriendsStore } from '../../../libs/filter-friends/store'

export const FriendsFiltering = withFilterFriendsStore(props => {
	useEffect(() => {
		props.store.friends.clear()
	}, [])

	return (
		<Card title={<BreadCrumb />} style={{ minHeight: '100%' }}>
			<FriendsFilteringActions />
			<FriendsFilteringTable />
		</Card>
	)
})
