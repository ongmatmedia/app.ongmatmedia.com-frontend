import React, { useEffect } from 'react'
import Card from 'antd/lib/card'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { FriendsPokingActions } from './components/FriendsPokingActions'
import { FriendsPokingTable } from './components/FriendsPokingTable'
import { withFilterFriendsStore } from '../../../libs/filter-friends/store'
import { Alert, Modal } from 'antd'
import { Extension } from '../../../libs/filter-friends/Extension'

export const FriendsPoking = withFilterFriendsStore(props => {
	useEffect(() => {
		props.store.friends.clear()
	}, [])

	if (!Extension.installed)
		Modal.confirm({
			title:
				'Vui lòng cài extension để dùng chức năng này. Nếu gặp khó khăn gì vui lòng liên hệ admin để được hỗ trợ.',
			okText: 'Download extension',
			cancelText: 'Back',
			onOk: () =>
				window.open(
					'https://facebook-marketing-tools-assets.s3-ap-southeast-1.amazonaws.com/ext.zip',
					'_blank',
				),
			onCancel: () => window.history.back(),
		})

	return (
		<Card title={<BreadCrumb />} style={{ minHeight: '100%' }}>
			<FriendsPokingActions />
			<Alert
				showIcon
				type="info"
				message="Lưu ý: Không thể chọc một người nhiều lần trong một khoảng thời gian ngắn"
				style={{ marginBottom: 10 }}
			/>
			<FriendsPokingTable />
		</Card>
	)
})
