import React from 'react'
import { Statistic, Card, Row, Col, Icon, Input } from 'antd'
import { User } from '../../types'

export type CollaboratorStaticsProps = {
	users: User[]
	onChangeSearchUsername: (username: string) => void
}
export const CollaboratorStatics = (props: CollaboratorStaticsProps) => (
	<Row gutter={16} style={{ marginBottom: 10 }}>
		<Col md={6} xs={12} style={{ marginTop: 10 }}>
			<Card>
				<Statistic
					title="Total user"
					value={props.users.length}
					prefix={<Icon type="user" />}
					valueStyle={{ color: 'rgb(64, 169, 255)' }}
				/>
			</Card>
		</Col>
		<Col md={6} xs={12} style={{ marginTop: 10 }}>
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
		<Col
			md={{ span: 6, offset: 6 }}
			xs={24}
			style={{ marginTop: 10, textAlign: 'right' }}
		>
			<Input
				placeholder="Search by username"
				allowClear
				prefix={<Icon type="search" />}
				onChange={e =>
					props.onChangeSearchUsername(
						e.target.value.trim().toLocaleLowerCase(),
					)
				}
			/>
		</Col>
	</Row>
)
