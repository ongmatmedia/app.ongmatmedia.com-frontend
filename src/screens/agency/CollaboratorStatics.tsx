import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Statistic from 'antd/lib/statistic'
import React from 'react'
import { User } from '../../types'

export type CollaboratorStaticsProps = {
	users: User[]
}
export const CollaboratorStatics = (props: CollaboratorStaticsProps) => (
	<Row gutter={16} style={{ marginBottom: 10 }}>
		<Col md={6} xs={24} style={{ marginTop: 10 }}>
			<Card>
				<Statistic
					title="Total user"
					value={props.users.length}
					prefix={<Icon type="user" />}
					valueStyle={{ color: 'rgb(64, 169, 255)' }}
				/>
			</Card>
		</Col>
		<Col md={8} xs={24} style={{ marginTop: 10 }}>
			<Card>
				<Statistic
					valueStyle={{ color: 'rgb(64, 169, 255)' }}
					title="Remain money"
					value={Math.round(
						props.users.reduce(
							(p, c) => p + (c.balance / c.price_percent) * 100,
							0,
						),
					).toLocaleString()}
					prefix={<Icon type="dollar" />}
				/>
			</Card>
		</Col>
	</Row>
)
