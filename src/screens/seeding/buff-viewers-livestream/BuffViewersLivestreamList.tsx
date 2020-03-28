import { Card, Col, Divider, Icon, List, Row, Skeleton } from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import Moment from 'react-moment'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { groupTimeIntoDayMap } from '../../../helpers/utils'
import { BuffViewersLivestreamConnection } from '../../../types'
import { BuffViewersDetailModal } from './BuffViewersLivestreamDetailModal'

const query = graphql`
	query BuffViewersLivestreamListQuery {
		buff_viewers_livestream_tasks {
			edges {
				node {
					id
					user_id
					uid
					status
					name
					note
					amount
					created_time
					end_time
					limit_mins
					logs {
						time
						amount
					}
				}
			}
		}
	}
`

export const BuffViewersLivestreamList = GraphQLWrapper<
	{
		buff_viewers_livestream_tasks: BuffViewersLivestreamConnection
	},
	{
		videoIdSearch: string
	}
>(query, {}, ({ data, loading, videoIdSearch }) => {
	if (loading) {
		return <Skeleton active loading paragraph={{ rows: 5 }} />
	} else if (!loading && data) {
		const [
			buffViewersDetailModalVisible,
			setBuffViewersDetailModalVisible,
		] = useState<boolean>(false)

		const buffViewersLivestreamTasks = data?.buff_viewers_livestream_tasks.edges.map(
			e => ({
				...e.node,
				time: e.node.created_time,
			}),
		)
		const timeSeriesBuffViewersLivestreamData = groupTimeIntoDayMap(
			buffViewersLivestreamTasks,
		)
			.filter(el => el.data.some(buff => !!buff.id.match(videoIdSearch)))
			.map(el => ({
				time: el.time,
				data: el.data.filter(buff => !!buff.id.match(videoIdSearch)),
			}))
		return (
			<>
				<BuffViewersDetailModal
					onClose={() => setBuffViewersDetailModalVisible(false)}
					visible={buffViewersDetailModalVisible}
				/>
				<List
					size="large"
					dataSource={timeSeriesBuffViewersLivestreamData}
					renderItem={item => (
						<>
							<div
								style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}
							>
								<Icon type="calendar" /> {item.time}
							</div>
							<List
								grid={{ gutter: 16, xs: 1, sm: 2, md: 4, xxl: 8 }}
								dataSource={item.data}
								renderItem={buffViewersLivestream => (
									<List.Item
										style={{
											borderRadius: 15,
											boxShadow:
												'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
											cursor: 'pointer',
										}}
										onClick={() => setBuffViewersDetailModalVisible(true)}
									>
										<Skeleton loading={loading} active>
											<Card
												extra={
													<Text strong>
														{`100/${buffViewersLivestream.amount}`}
													</Text>
												}
												type="inner"
												title={buffViewersLivestream.status}
												headStyle={{ textAlign: 'left' }}
											>
												<Row>
													<Col xs={24}>
														<Row>
															<Col span={12}>
																<Text strong>ID</Text>
															</Col>
															<Col span={12} style={{ textAlign: 'right' }}>
																{buffViewersLivestream.id}
															</Col>
														</Row>
													</Col>
												</Row>
												<Row>
													<Col xs={24}>
														<Row>
															<Col span={12}>
																<Text strong>Min</Text>
															</Col>
															<Col span={12} style={{ textAlign: 'right' }}>
																{buffViewersLivestream.limit_mins} minutes
															</Col>
														</Row>
													</Col>
												</Row>
												<Row>
													<Col xs={24}>
														<Row>
															<Col span={12}>
																<Text strong>Bought at</Text>
															</Col>
															<Col span={12} style={{ textAlign: 'right' }}>
																<Moment toNow>
																	{buffViewersLivestream.created_time}
																</Moment>
															</Col>
														</Row>
													</Col>
												</Row>
												<Row>
													<Col xs={24}>
														<Row>
															<Col span={12}>
																<Text strong>Remain</Text>
															</Col>
															<Col span={12} style={{ textAlign: 'right' }}>
																<Moment toNow>
																	{buffViewersLivestream.created_time}
																</Moment>
															</Col>
														</Row>
													</Col>
												</Row>
											</Card>
										</Skeleton>
									</List.Item>
								)}
							/>
							<Divider />
						</>
					)}
				/>
			</>
		)
	}
})
