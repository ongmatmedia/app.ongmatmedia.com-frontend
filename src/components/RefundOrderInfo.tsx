import React from 'react'
import { Row, Col, Card, Tag } from 'antd'

export type RefundOrderInfoProps = {
	title: string
	statics: Array<{ name: string; amount: string | number; color?: string }>
}

export const RefundOrderInfo = (props: RefundOrderInfoProps) => (
	<Card title={props.title}>
		{props.statics.map(({ name, amount, color }) => (
			<Row type="flex" justify="space-between" style={{ marginBottom: 5 }}>
				<Col>{name}</Col>
				<Col>
					<Tag color={color}>
						{typeof amount == 'number' ? amount.toLocaleString() : amount}
					</Tag>
				</Col>
			</Row>
		))}
	</Card>
)
