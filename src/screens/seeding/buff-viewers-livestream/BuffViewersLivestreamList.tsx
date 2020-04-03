import {
	Button,
	Card,
	Col,
	Divider,
	Icon,
	List,
	Row,
	Skeleton,
	Spin,
	Tooltip,
} from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { commitLocalUpdate } from 'relay-runtime'
import {
	GraphQLQueryFetcher,
	PaginationWrapper,
} from '../../../graphql/GraphQLWrapper'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { groupTimeIntoDayMap } from '../../../helpers/utils'
import { BuffViewersLivestreamConnection } from '../../../types'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { BuffViewersDetailModal } from './BuffViewersLivestreamDetailModal'
import { BuffViewersLivetreamStatistics } from './BuffViewersLivetreamStatistics'

const query = graphql`
	query BuffViewersLivestreamListQuery(
		$after: String
		$first: Int
		$before_time: Long
	) {
		...BuffViewersLivestreamList_buff_viewers_livestream_tasks
			@arguments(after: $after, first: $first, before_time: $before_time)
	}
`

const update_playing_videos = async () => {
	const { buff_viewers_livestream_playing } = await GraphQLQueryFetcher<{
		buff_viewers_livestream_playing: BuffViewersLivestreamConnection
	}>(
		graphql`
			query BuffViewersLivestreamListPlayingQuery {
				buff_viewers_livestream_playing {
					edges {
						node {
							id
							status
							first_reported_viewers
							last_reported_viewers
						}
					}
				}
			}
		`,
		{},
	)

	commitLocalUpdate(RelayEnvironment, store => {
		for (const { node } of buff_viewers_livestream_playing.edges) {
			const buff_task = store.get(node.id)
			const logs = buff_task && buff_task.getLinkedRecords('logs')
			if (!logs) continue
			const new_log = store.create(
				`client:${node.id}:logs:${logs.length}`,
				'BuffViewersLivestreamLog',
			)
			new_log.setValue(node.last_reported_viewers, 'amount')
			new_log.setValue(Date.now(), 'time')
			buff_task.setLinkedRecords([...logs, new_log], 'logs')
		}
	})
}

export const BuffViewersLivestreamList = PaginationWrapper<{
	buff_viewers_livestream_tasks: BuffViewersLivestreamConnection
}>(
	query,
	graphql`
		fragment BuffViewersLivestreamList_buff_viewers_livestream_tasks on Query
			@argumentDefinitions(
				after: { type: "String" }
				first: { type: "Int" }
				before_time: { type: "Long" }
			) {
			buff_viewers_livestream_tasks(
				first: $first
				after: $after
				before_time: $before_time
			)
				@connection(
					key: "BuffViewersLivestreamList_buff_viewers_livestream_tasks"
				) {
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
						last_reported_viewers
						first_reported_viewers
					}
				}
			}
		}
	`,
	{},
	({ data, loading, reload, has_more, load_more, loading_more }) => {
		if (loading && !data)
			return <Skeleton active loading paragraph={{ rows: 5 }} />

		useEffect(() => {
			update_playing_videos()
			const iid = setInterval(update_playing_videos, 15000)
			return () => clearInterval(iid)
		}, [])

		const [videoIdSearch, setVideoIdSearch] = useState<string>()

		const [selectedBuffId, setSelectedBuffId] = useState<string>(null)

		const [statusFilter, setStatusFilter] = useState<string>('')

		const buffStatusData = data.buff_viewers_livestream_tasks.edges.map(
			e => e.node.status,
		)

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

		const conditionStatusFilter = (condition: boolean) =>
			!!statusFilter ? condition : true

		const timeSeriesBuffViewersLivestreamData = groupTimeIntoDayMap(
			buffViewersLivestreamTasks,
		)
			.filter(el =>
				el.data.some(
					buff =>
						!!buff.id.match(videoIdSearch) &&
						conditionStatusFilter(buff.status == statusFilter),
				),
			)
			.map(el => ({
				time: el.time,
				data: el.data.filter(
					buff =>
						!!buff.id.match(videoIdSearch) &&
						conditionStatusFilter(buff.status == statusFilter),
				),
			}))

		return (
			<>
				{selectedBuffId && (
					<BuffViewersDetailModal
						onClose={() => {
							setSelectedBuffId(null)
							setBuffViewersDetailModalVisible(false)
						}}
						video_id={selectedBuffId}
					/>
				)}
				<BuffViewersLivetreamStatistics buffStatusData={buffStatusData} />
				<BuffViewersLivestreamAction
					onChangeSearch={id => setVideoIdSearch(id)}
					onChangeDate={d => reload({ first: 12, before_time: d.getTime() })}
					onChangeStatusFilter={status => setStatusFilter(status)}
				/>
				<Spin spinning={loading}>
					<List
						size="large"
						dataSource={timeSeriesBuffViewersLivestreamData}
						renderItem={item => (
							<>
								<div
									style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}
								>
									<Icon type="calendar" style={{ marginRight: 5 }} />
									<Moment format="DD/MM/YYYY">{item.time}</Moment>
								</div>
								<List
									grid={{ gutter: 16, xs: 1, sm: 2, lg: 3, xxl: 4 }}
									dataSource={item.data}
									renderItem={buffViewersLivestream => (
										<List.Item
											style={{
												borderRadius: 15,
												boxShadow:
													'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
												cursor: `${
													buffViewersLivestream.status == 'playing'
														? 'pointer'
														: ''
												}`,
											}}
											onClick={() => {
												setSelectedBuffId(buffViewersLivestream.id)
												setBuffViewersDetailModalVisible(true)
											}}
										>
											<Skeleton loading={loading} active>
												<Card
													extra={
														<Text strong>
															{`100 / ${buffViewersLivestream.amount}`}
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
													<Row>
														<Col xs={24}>
															<Row>
																<Col span={12}>
																	<Text strong>Last report viewers</Text>
																</Col>
																<Col span={12} style={{ textAlign: 'right' }}>
																	{buffViewersLivestream.last_reported_viewers}
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
				</Spin>
				{!!has_more && (
					<Row type="flex" justify="center" align="middle">
						<Col xs={24} style={{ textAlign: 'center' }}>
							<Tooltip
								title={
									videoIdSearch
										? 'Kết quả tìm kiếm đang bị giới hạn bởi nội dung tìm kiếm, vui lòng xóa bộ lọc để hiển thị toàn bộ kết quả.'
										: ''
								}
								trigger="click"
							>
								<Button
									loading={loading_more}
									type="dashed"
									icon="vertical-align-bottom"
									style={{ margin: 10 }}
									onClick={() => load_more(20)}
								>
									{loading_more ? 'Loading' : 'Show more'}
								</Button>
							</Tooltip>
							,
						</Col>
					</Row>
				)}
			</>
		)
	},
)
