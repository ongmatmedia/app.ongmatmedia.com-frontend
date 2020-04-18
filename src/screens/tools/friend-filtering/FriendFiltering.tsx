import React from 'react'
import Card from 'antd/lib/card'
import {BreadCrumb} from '../../../components/common/BreadCrumb'
import {FriendFilteringActions} from './components/FriendFilteringActions'
import {FriendFilteringTable} from './components/FriendFilteringTable'

export const FriendFiltering = () => {

  return (
    <Card title={<BreadCrumb />}>
      <FriendFilteringActions />
      <FriendFilteringTable />
    </Card>
  )
}