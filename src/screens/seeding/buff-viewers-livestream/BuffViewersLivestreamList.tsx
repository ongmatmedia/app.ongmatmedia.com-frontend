import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import Skeleton from 'antd/lib/skeleton'
import Spin from 'antd/lib/spin'
import Tooltip from 'antd/lib/tooltip'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { commitLocalUpdate } from 'relay-runtime'
import { useAuth0 } from '../../../context/Auth0'
import {
	GraphQLQueryFetcher,
	PaginationWrapper,
} from '../../../graphql/GraphQLWrapper'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { on_update_buff_viewers_livestream_playing } from '../../../graphql/subscriptions/on_update_buff_viewers_livestream_playing'
import { groupTimeIntoDayMap } from '../../../helpers/utils'
import { BuffViewersLivestreamConnection } from '../../../types'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { BuffViewersLivetreamStatistics } from './BuffViewersLivetreamStatistics'
import './style.css'

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

const statusMapping = {
	playing: {
		type: 'video-camera',
		style: {
			color: '#ff5722',
			fontSize: 20,
		},
		className: 'flash',
	},
	done: {
		type: 'check-circle',
		theme: 'filled',
		style: {
			color: 'green',
			fontSize: 20,
		},
	},
	queue: {
		type: 'clock-circle',
		style: {
			color: 'grey',
			fontSize: 20,
		},
	},
	created: {
		type: 'clock-circle',
		style: {
			color: 'grey',
			fontSize: 20,
		},
	},
	fail: {
		type: 'warning',
		theme: '',
		style: {
			color: '#ffa41b',
			fontSize: 20,
		},
	},
	overload: {
		type: 'thunderbolt',
		theme: 'filled',
		style: {
			color: '#ffa41b',
			fontSize: 20,
		},
	},
	default: {
		type: 'question-circle',
		theme: '',
		style: {
			color: 'black',
			fontSize: 20,
		},
	},
}

const BuffViewerLivestreamStatusIcon = (props: { status: string }) => {
	const { type, style, className, theme } =
		statusMapping[props.status == '' ? 'created' : props.status] ||
		statusMapping.default
	return <Icon type={type} style={style} theme={theme} className={className} />
}

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

export const BuffViewersLivestreamList = PaginationWrapper<
	{
		buff_viewers_livestream_tasks: BuffViewersLivestreamConnection
	},
	{
		onSelectBuff: (id: string) => void
	}
>(
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
						orders {
							from
							amount
							time
							limit_mins
						}
					}
				}
			}
		}
	`,
	{},
	({
		data,
		loading,
		reload,
		has_more,
		load_more,
		loading_more,
		onSelectBuff,
	}) => {
		if (loading && !data)
			return <Skeleton active loading paragraph={{ rows: 5 }} />

		useEffect(() => {
			const updateBuffSubscription = on_update_buff_viewers_livestream_playing()
			return () => updateBuffSubscription.dispose()
		}, [])

		useEffect(() => {
			update_playing_videos()
			const tid = setInterval(update_playing_videos, 15000)
			return () => clearInterval(tid)
		}, [])

		const [videoIdSearch, setVideoIdSearch] = useState<string>()

		const [statusFilter, setStatusFilter] = useState<string>('')

		const { user } = useAuth0()

		const buffStatusData = data.buff_viewers_livestream_tasks.edges.map(
			e => e.node.status,
		)

		const buffViewersLivestreamTasks = data?.buff_viewers_livestream_tasks.edges.map(
			e => ({
				...e.node,
				time: e.node.created_time,
			}),
		)

		const playingBuffViewersLivestream = buffViewersLivestreamTasks.filter(
			el => el.status == 'playing',
		)

		const totalAvailableAmount = playingBuffViewersLivestream
			.map(buff =>
				buff.orders.filter(
					order =>
						order.from == user.sub &&
						order.time + order.limit_mins * 60 * 1000 >= Date.now(),
				),
			)
			.reduce(
				(sumTotalAvailableAmounts, curr) =>
					sumTotalAvailableAmounts +
					curr.reduce(
						(sumEachAvailableAmount, currEach) =>
							sumEachAvailableAmount + currEach.amount,
						0,
					),
				0,
			)

		const totalIncreaseViewers =
			playingBuffViewersLivestream
				.map(buff => buff.last_reported_viewers)
				.reduce(
					(sumLastReportedViewers, curr) => sumLastReportedViewers + curr,
					0,
				) -
			playingBuffViewersLivestream
				.map(buff => buff.first_reported_viewers)
				.reduce(
					(sumFirstReportedViewers, curr) => sumFirstReportedViewers + curr,
					0,
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
				<BuffViewersLivetreamStatistics
					buffStatusData={buffStatusData}
					percentage={
						((totalIncreaseViewers > 0 ? totalIncreaseViewers : 0) /
							totalAvailableAmount) *
						100
					}
					totalIncreaseViewers={
						totalIncreaseViewers > 0 ? totalIncreaseViewers : 0
					}
					totalAvailableAmount={totalAvailableAmount}
				/>
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
												cursor: 'pointer',
											}}
											onClick={() => {
												onSelectBuff(buffViewersLivestream.id)
											}}
										>
											<Skeleton loading={loading} active>
												<Card
													extra={
														buffViewersLivestream.status == 'playing' && (
															<Text strong>
																{`${
																	buffViewersLivestream.last_reported_viewers ||
																	'_'
																} / ${
																	buffViewersLivestream.orders.reduce(
																		(sum, curr) =>
																			curr.from == user.sub &&
																			curr.time + curr.limit_mins * 60 * 1000 >=
																				Date.now()
																				? sum + curr.amount
																				: sum,
																		0,
																	) +
																		buffViewersLivestream.first_reported_viewers ||
																	'_'
																}`}
															</Text>
														)
													}
													type="inner"
													title={
														<BuffViewerLivestreamStatusIcon
															status={buffViewersLivestream.status}
														/>
													}
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
																	<Text strong>Last bought</Text>
																</Col>
																<Col span={12} style={{ textAlign: 'right' }}>
																	<Moment fromNow>
																		{buffViewersLivestream.orders.reduce(
																			(lastest, curr) =>
																				curr.time >= lastest
																					? curr.time
																					: lastest,
																			buffViewersLivestream.orders[0].time,
																		)}
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
																	{buffViewersLivestream.status == 'playing' ? (
																		<Moment fromNow>
																			{buffViewersLivestream.orders
																				.filter(order => order.from == user.sub)
																				.reduce<number>(
																					(max, curr) =>
																						curr.time +
																							curr.limit_mins * 60 * 1000 >=
																						max
																							? curr.time +
																							  curr.limit_mins * 60 * 1000
																							: max,
																					buffViewersLivestream.orders.filter(
																						order => order.from == user.sub,
																					)[0]?.time +
																						buffViewersLivestream.orders.filter(
																							order => order.from == user.sub,
																						)[0]?.limit_mins *
																							60 *
																							1000,
																				)}
																		</Moment>
																	) : (
																		'_'
																	)}
																</Col>
															</Row>
														</Col>
													</Row>
													<Row>
														<Col xs={24}>
															<Row>
																<Col span={12}>
																	<Text strong>First viewers</Text>
																</Col>
																<Col span={12} style={{ textAlign: 'right' }}>
																	{buffViewersLivestream.first_reported_viewers ||
																		'_'}
																</Col>
															</Row>
														</Col>
													</Row>
													<Row>
														<Col xs={24}>
															<Row>
																<Col span={12}>
																	<Text strong>Total bought</Text>
																</Col>
																<Col span={12} style={{ textAlign: 'right' }}>
																	{buffViewersLivestream.orders.reduce(
																		(sum, curr) =>
																			curr.from == user.sub
																				? sum + curr.amount
																				: sum,
																		0,
																	) || '_'}
																</Col>
															</Row>
														</Col>
													</Row>
												</Card>
											</Skeleton>
										</List.Item>
									)}
								/>
								{timeSeriesBuffViewersLivestreamData.indexOf(item) !==
									timeSeriesBuffViewersLivestreamData.length - 1 && <Divider />}
							</>
						)}
					/>
				</Spin>
				{has_more() && (
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
