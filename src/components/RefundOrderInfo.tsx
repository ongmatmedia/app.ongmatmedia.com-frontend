import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Tag from 'antd/lib/tag'
import React from 'react'

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
