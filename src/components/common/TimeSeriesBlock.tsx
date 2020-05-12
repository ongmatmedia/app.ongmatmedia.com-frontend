import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import Tag from 'antd/lib/tag'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { groupTimeIntoDayMap } from '../../helpers/utils'
import { PaymentHistory } from '../../types'
import { NoteReading } from './NoteReading'
import { useAuth0 } from '../../context/Auth0'

export const TimeSeriesBlock = (props: { data: PaymentHistory[] }) => {
	const transformeData = props.data.map(({ time, ...rest }) => ({
		...rest,
		created_time: time,
	}))
	const timeSeriesData = groupTimeIntoDayMap(transformeData)
	const { user } = useAuth0()

	return (
		<List
			size="large"
			dataSource={timeSeriesData}
			renderItem={item => (
				<>
					<div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
						<Icon type="calendar" style={{ marginRight: 5 }} />
						{item.time}
					</div>
					<List
						grid={{ gutter: 16, xs: 1, sm: 2, lg: 4 }}
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
									style={{ minHeight: 320 }}
								>
									<Row>
										<Col xs={24}>
											<Row>
												<Col span={12}>
													<Text strong>Time</Text>
												</Col>
												<Col span={12} style={{ textAlign: 'right' }}>
													{`${new Date(
														payment.created_time,
													).toLocaleTimeString()}`}
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
														{payment.sender_id == user.sub
															? 'me'
															: payment.sender_username.substring(0, 11) +
																	'...' || 'system'}
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
					{timeSeriesData.indexOf(item) !== timeSeriesData.length - 1 && (
						<Divider />
					)}
				</>
			)}
		/>
	)
}
