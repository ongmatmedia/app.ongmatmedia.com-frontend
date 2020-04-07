import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import Result from 'antd/lib/result'
import React from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'

export const NotificationPage = () => {
	return (
		<Card title={<BreadCrumb />} style={{ height: 'calc(100vh - 65px)' }}>
			<Result
				icon={<Icon type="smile" theme="twoTone" />}
				title="Bạn không có thông báo mới nào!"
			/>
		</Card>
	)
}
