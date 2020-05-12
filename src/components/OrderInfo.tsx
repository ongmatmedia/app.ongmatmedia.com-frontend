import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Tag from 'antd/lib/tag'
import React from 'react'

export type OrderInfoProps = {
	order: Array<{ amount: number; unit: string }>
	old?: Array<{ amount: number; unit: string }>
	balance: number
}

export const OrderInfo = (props: OrderInfoProps) => {
	const order_total = props.order.reduce((p, c) => ((p *= c.amount), p), 1)
	const old_total =
		props.old && props.old.length > 0
			? props.old.reduce((p, c) => ((p *= c.amount), p), 1)
			: 0
	const total = old_total - order_total
	if (total == 0) return null

	return (
		<Card size="small">
			<Row>
				<Col>
					<span style={{ fontSize: 15, fontWeight: 'bold' }}>Your order</span>
				</Col>
			</Row>
			<Row type="flex" justify="space-around">
				<Col>
					{props.order.map((p, i, { length }) => (
						<span>
							<Tag style={{ marginTop: 10 }} color="#108ee9">
								{p.amount}
							</Tag>
							{p.unit} {i < length - 1 && 'x '}
						</span>
					))}{' '}
					={' '}
					<Tag style={{ marginTop: 10 }} color="#108ee9">
						{order_total.toLocaleString()}
					</Tag>
				</Col>
			</Row>
			{total > 0 &&
				props.old && [
					<Row>
						<Col>
							<span style={{ fontSize: 15, fontWeight: 'bold' }}>
								Your old order
							</span>
						</Col>
					</Row>,
					<Row type="flex" justify="space-around">
						<Col>
							{props.old.map((p, i, { length }) => (
								<span>
									<Tag color="#108ee9">{p.amount}</Tag>
									{p.unit} {i < length - 1 && 'x '}
								</span>
							))}{' '}
							= <Tag color="#108ee9">{old_total.toLocaleString()}</Tag>
						</Col>
					</Row>,
				]}
			<Row
				type="flex"
				align="middle"
				justify="space-between"
				style={{ marginTop: 5, marginBottom: 5 }}
			>
				<Col>
					<span style={{ fontSize: 15, fontWeight: 'bold' }}>Total</span>
				</Col>
				<Col>
					<Tag color="#108ee9">{total.toLocaleString()}</Tag>
				</Col>
			</Row>
			<Row type="flex" align="middle" justify="space-between">
				<Col>
					<span style={{ fontSize: 15, fontWeight: 'bold' }}>Your balance</span>
				</Col>
				<Col>
					<Tag color="#108ee9">{props.balance.toLocaleString()}</Tag>
				</Col>
			</Row>
		</Card>
	)
}
