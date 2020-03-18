import React from 'react'
import { Card, Col, Row } from 'antd'
import { AgencyList } from './AgencyList'

export const AgencyPage = () => (
	<Card title="Agency manager" bodyStyle={{ padding: 20 }}>
		<Row>
			<Col span={24}>
				<AgencyList />
			</Col>
		</Row>
	</Card>
)
