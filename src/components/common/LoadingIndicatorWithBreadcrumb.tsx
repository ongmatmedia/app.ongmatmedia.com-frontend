import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import React from 'react'
import { BreadCrumb } from './BreadCrumb'

export const LoadingIndicatorWithBreadcrumb = () => (
	<Card title={<BreadCrumb />} style={{ minHeight: '100%' }}>
		<Row type="flex" justify="space-around">
			<Col>
				<Spin
					indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
					spinning={true}
				/>
			</Col>
		</Row>
	</Card>
)
