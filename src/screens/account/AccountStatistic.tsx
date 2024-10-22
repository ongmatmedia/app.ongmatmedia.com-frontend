import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Statistic from 'antd/lib/statistic'
import React from 'react'
export type AgencyStaticsProps = {
	accounts: { id: string; name: string; live: boolean }[]
}
export const AccountStatistic = (props: AgencyStaticsProps) => (
	<Row gutter={16} style={{ marginBottom: 10 }}>
		<Col xs={24} sm={8} md={6} style={{ marginTop: 10 }}>
			<Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
				<Statistic
					title="Total account"
					value={props.accounts.length}
					prefix={<Icon type="user" />}
					valueStyle={{ color: 'rgb(64, 169, 255)' }}
				/>
			</Card>
		</Col>
		<Col sm={8} xs={24} md={6} style={{ marginTop: 10 }}>
			<Card style={{ border: '4px solid green' }}>
				<Statistic
					title="Live account"
					value={props.accounts.filter(account => account.live).length}
					prefix={<Icon type="user" />}
					valueStyle={{ color: 'green' }}
				/>
			</Card>
		</Col>
		<Col sm={8} xs={24} md={6} style={{ marginTop: 10 }}>
			<Card style={{ border: '4px solid red' }}>
				<Statistic
					title="Died account"
					value={props.accounts.filter(account => !account.live).length}
					prefix={<Icon type="user" />}
					valueStyle={{ color: 'red' }}
				/>
			</Card>
		</Col>
	</Row>
)
