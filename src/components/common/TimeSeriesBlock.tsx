import { List, Card, Divider, Icon, Row, Col, Tag } from 'antd'
import React from 'react'
import { PaymentHistory } from '../../types'
import { groupTimeIntoDayMap } from '../../helpers/utils'
import Text from 'antd/lib/typography/Text'
import { NoteReading } from './NoteReading'

const data: PaymentHistory[] = [
	{
		id: '111111111',
		time: 123456789,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 123456789,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 987654321,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 123456789,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note:
			'Buff 50 viewers livestream for 346370772515583 video id 325135155113931 with price 3$/view',
	},
	{
		id: '111111111',
		time: 987654321,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 987654321,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 987654321,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
	{
		id: '111111111',
		time: 987654321,
		total: 1000000,
		sender_username: 'tien',
		sender_id: '123123123123',
		receiver_username: 'ba',
		service: 'service',
		receiver_id: '1123456789',
		balance_after: 10000000,
		note: 'note',
	},
]

export const TimeSeriesBlock = (props: { data: PaymentHistory[] }) => {
	const timeSeriesData = groupTimeIntoDayMap(props.data)
	return (
		<List
			size="large"
			dataSource={timeSeriesData}
			renderItem={item => (
				<>
					<div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
						<Icon type="calendar" /> {item.time}
					</div>
					<List
						grid={{ gutter: 16, xs: 1, sm: 2, md: 4, xxl: 8 }}
						dataSource={item.data}
						renderItem={payment => (
							<List.Item
								style={{
									borderRadius: 15,
									boxShadow:
										'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
								}}
							>
								<Card
									extra={
										<Text strong>
											{`${payment.total >= 0 ? '+' : ''}` +
												payment.total.toLocaleString()}
										</Text>
									}
									type="inner"
								>
									<Row>
										<Col xs={24}>
											<Row>
												<Col span={12}>
													<Text strong>Time</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													{`${new Date(payment.time).toLocaleTimeString()}`}
												</Col>
											</Row>
										</Col>
										<Col xs={24} style={{ marginBottom: 25 }}>
											<Row>
												<Col span={12}>
													<Text strong>From</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													<Tag style={{ marginRight: 0, marginBottom: 2 }}>
														{payment.sender_username}
													</Tag>
												</Col>
												<Col span={12}>
													<Text strong>To</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													<Tag style={{ marginRight: 0 }}>
														{payment.receiver_username}
													</Tag>
												</Col>
											</Row>
										</Col>
										<Col xs={24}>
											<Row>
												<Col span={12}>
													<Text strong>Remain</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													{payment.balance_after.toLocaleString()}
												</Col>
											</Row>
										</Col>
										<NoteReading note={payment.note} />
									</Row>
								</Card>
							</List.Item>
						)}
					/>
					<Divider />
				</>
			)}
		/>
	)
}
