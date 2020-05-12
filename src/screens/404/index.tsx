import React from 'react'
import { Card, Result } from 'antd'
import { BreadCrumb } from '../../components/common/BreadCrumb'

export const Page404 = () => (
	<Card style={{ minHeight: '100%' }}>
		<Result
			status="404"
			title="404"
			subTitle="Tính năng này sẽ được cập nhật trong phiên bản kế tiếp"
		/>
	</Card>
)
