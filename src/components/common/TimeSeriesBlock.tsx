import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import Tag from 'antd/lib/tag'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import Moment from 'react-moment'
import { groupTimeIntoDayMap } from '../../helpers/utils'
import { PaymentHistory } from '../../types'
import { NoteReading } from './NoteReading'

export const TimeSeriesBlock = (props: { data: PaymentHistory[] }) => {
	const timeSeriesData = groupTimeIntoDayMap(props.data)
	return (
		<List
			size="large"
			dataSource={timeSeriesData}
			renderItem={item => (
				<>
					<div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
						<Icon type="calendar" style={{ marginRight: 5 }} />
						<Moment format="DD/MM/YYYY">{item.time}</Moment>
					</div>
					<List
						grid={{ gutter: 16, xs: 1, sm: 2, md: 3, xxl: 4 }}
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
														{payment.sender_username || 'system'}
													</Tag>
												</Col>
												<Col span={12}>
													<Text strong>To</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													<Tag style={{ marginRight: 0 }}>
														{payment.receiver_username || 'system'}
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
										<NoteReading note={payment.note} collapse={true} />
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
