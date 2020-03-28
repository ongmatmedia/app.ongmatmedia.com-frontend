import React from 'react'
import { Row, Result, Icon, Button, Card } from 'antd'
import { BreadCrumb } from '../../components/common/BreadCrumb'

export const NotificationPage = () => {
	return (
		<Card title={<BreadCrumb />} style={{ height: 'calc(100vh - 65px)' }}>
			<Result
				icon={<Icon type="smile" theme="twoTone" />}
				title="Bạn không có thông báo mới nào!"
				// extra={<Button type="primary">Next</Button>}
			/>
		</Card>
	)
}
