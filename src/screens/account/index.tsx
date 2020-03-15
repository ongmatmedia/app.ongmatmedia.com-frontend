import { Col, Row, Tabs } from 'antd'
import React, { useState } from 'react'
import { AccountListContainer } from './AccountListContainer'

const { TabPane } = Tabs

export const AccountScreen = () => {
	const [activeTabKey, setActiveTabKey] = useState<string>('1')

	return (
		<Row style={{ backgroundColor: 'white', padding: 20 }}>
			<Col span={24}>
				<Tabs
					activeKey={activeTabKey}
					onTabClick={(key: string, event: MouseEvent) => setActiveTabKey(key)}
					defaultActiveKey="1"
					type="card"
				>
					<TabPane tab="Facebook" key="1">
						<AccountListContainer />
					</TabPane>
					<TabPane tab="Shopee" key="2" disabled></TabPane>
					<TabPane tab="Zalo" key="3" disabled></TabPane>
					<TabPane tab="Sendo" key="4" disabled></TabPane>
					<TabPane tab="Lazada" key="5" disabled></TabPane>
					<TabPane tab="Tiki" key="6" disabled></TabPane>
				</Tabs>
			</Col>
		</Row>
	)
}
