import React, {useEffect} from 'react'
import Card from 'antd/lib/card'
import {BreadCrumb} from '../../../components/common/BreadCrumb'
import {FriendsPokingActions} from './components/FriendsPokingActions'
import {FriendsPokingTable} from './components/FriendsPokingTable'
import {withFilterFriendsStore} from '../../../libs/filter-friends/store'
import {Alert} from 'antd'

export const FriendsPoking = withFilterFriendsStore(props =>
{

	useEffect(() =>
	{
		props.store.friends.clear()
	}, [])

	return (
		<Card title={<BreadCrumb />}>
			<FriendsPokingActions />
			<Alert showIcon type="info" message="Note: Cannot poke a person consecutively for a short time." style={{marginBottom: 10}} />
			<FriendsPokingTable />
		</Card>
	)
})
