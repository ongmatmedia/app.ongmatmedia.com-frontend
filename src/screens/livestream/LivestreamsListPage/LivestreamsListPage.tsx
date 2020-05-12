import { notification, Skeleton, Result } from 'antd'
import Alert from 'antd/lib/alert'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import Tooltip from 'antd/lib/tooltip'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Fab } from 'react-tiny-fab'
import { isNullOrUndefined } from 'util'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { useAuth0 } from '../../../context/Auth0'
import { delete_livestream } from '../../../graphql/delete_livestream'
import {
	GraphQLQueryFetcher,
	PaginationWrapper,
} from '../../../graphql/GraphQLWrapper'
import { stop_livestream } from '../../../graphql/stop_livestream'
import history from '../../../helpers/history'
import { groupTimeIntoDayMap } from '../../../helpers/utils'
import {
	Livestream,
	LivestreamConnection,
	LivestreamSubscription,
} from '../../../types'
import { LivestreamActions } from './LivestreamActions'
import { LivestreamListItem } from './LivestreamListItem'
import { LivestreamStatistics } from './LivestreamStatistics'

// const query = graphql`
// 	query LivestreamsListPageQuery(
// 		$after: String
// 		$first: Int
// 		$before_time: Long
// 	) {
// 		...LivestreamsListPage_livestream_tasks
// 			@arguments(after: $after, first: $first, before_time: $before_time)
// 	}
// `

// const LivestreamsListView = (props: {
// 	list: Livestream[]
// 	reload: Function
// 	has_more: Function
// 	load_more: Function
// 	loading_more: boolean
// 	loading: boolean
// }) =>
// {
// 	const {user} = useAuth0()

// 	const [searchValue, setSearchValue] = useState<string>('')

// 	const [statusFilter, setStatusFilter] = useState<string | null>(null)

// 	const [activeSubscription, setActiveSubscription] = useState<
// 		LivestreamSubscription
// 	>()

// 	const conditionStatusFilter = (condition: boolean) =>
// 		!isNullOrUndefined(statusFilter) ? condition : true

// 	const livestreamsGroupedByDay = groupTimeIntoDayMap(props.list)
// 		.filter(el =>
// 			el.data.some(
// 				livestream =>
// 					(livestream.name.match(searchValue) ||
// 						livestream.title.match(searchValue) ||
// 						livestream.description.match(searchValue)) &&
// 					conditionStatusFilter(livestream.status === statusFilter),
// 			),
// 		)
// 		.map(el => ({
// 			time: el.time,
// 			data: el.data.filter(
// 				livestream =>
// 					(livestream.id.match(searchValue) ||
// 						livestream.title.match(searchValue) ||
// 						livestream.description.match(searchValue)) &&
// 					conditionStatusFilter(livestream.status === statusFilter),
// 			),
// 		}))

// 	useEffect(() =>
// 	{
// 		activeSubscription?.quality == 0 &&
// 			Modal.info({
// 				title:
// 					'Bạn cần đăng ký gói cước trước khi sử dụng dịch vụ TẠO LIVESTREAM. Bấm OK để tới trang đăng ký gói cước.',
// 				okText: 'OK',
// 				centered: true,
// 				maskClosable: true,
// 				onOk: () =>
// 				{
// 					history.push('/livestream/pricing')
// 				},
// 			})
// 	}, [activeSubscription])

// 	useEffect(() =>
// 	{
// 		const fn = async () =>
// 		{
// 			const data = await GraphQLQueryFetcher<{
// 				livestream_subscription: LivestreamSubscription
// 			}>(
// 				graphql`
// 					query LivestreamsListPageSubscriptionQuery {
// 						livestream_subscription {
// 							id
// 							user_id
// 							quality
// 							concurrent_limit
// 							end_time
// 							playing
// 							name
// 						}
// 					}
// 				`,
// 				{user_id: user.sub},
// 			)
// 			setActiveSubscription(data.livestream_subscription)
// 		}
// 		if (user?.sub) fn()
// 	}, [user])

// 	return (
// 		<Card title={<BreadCrumb />} style={{minHeight: '100%'}}>
// 			<Fab
// 				mainButtonStyles={{backgroundColor: '#1890ff'}}
// 				icon={<Icon type="plus" />}
// 				event="click"
// 				onClick={() => history.push('/livestream/create-livestream')}
// 			/>
// 			{activeSubscription?.quality == 0 && (
// 				<Alert
// 					type="error"
// 					showIcon
// 					message={
// 						<Text>
// 							Bạn chưa đăng ký gói cước nào. Vui lòng đăng ký tại{' '}
// 							<Link to="/livestream/pricing">đây</Link>
// 						</Text>
// 					}
// 				/>
// 			)}
// 			{activeSubscription?.quality !== 0 && (
// 				<Alert
// 					type="info"
// 					showIcon
// 					message={
// 						<Text>
// 							Thông tin gói cước đang sử dụng:{' '}
// 							{activeSubscription?.name.toLocaleUpperCase()} - Chất lượng tối đa{' '}
// 							{activeSubscription?.quality}p - Hết hạn vào{' '}
// 							{new Date(activeSubscription?.end_time).toLocaleString('vi-Vn')}.
// 							Nếu có nhu cầu đổi gói cước vui lòng truy cập{' '}
// 							<Link to="/livestream/pricing">GÓI CƯỚC LIVESTREAM</Link>
// 						</Text>
// 					}
// 				/>
// 			)}
// 			{props.loading ? (
// 				<Skeleton active />
// 			) : (
// 					<LivestreamStatistics
// 						total={props.list.length}
// 						playing={
// 							props.list.filter(livestream => livestream.status == 'playing')
// 								.length
// 						}
// 					/>
// 				)}
// 			<LivestreamActions
// 				onChangeSearch={id => setSearchValue(id)}
// 				onChangeDate={d =>
// 					props.reload({first: 12, before_time: d.getTime()})
// 				}
// 				onChangeStatusFilter={status => setStatusFilter(status)}
// 			/>
// 			{props.loading ? (
// 				<Skeleton active />
// 			) : (
// 					<>
// 						<List
// 							size="large"
// 							dataSource={livestreamsGroupedByDay}
// 							renderItem={livestreamsEachDay => (
// 								<>
// 									<div
// 										style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}
// 									>
// 										<Icon type="calendar" style={{marginRight: 5}} />
// 										{livestreamsEachDay.time}
// 									</div>
// 									<List
// 										grid={{
// 											gutter: 10,
// 											xs: 1,
// 											sm: 2,
// 											md: 3,
// 											lg: 4,
// 										}}
// 										dataSource={livestreamsEachDay.data}
// 										renderItem={(live: Livestream & {time: any}) => (
// 											<List.Item>
// 												<LivestreamListItem
// 													live={live}
// 													onDeleteLivestream={async () =>
// 													{
// 														try
// 														{
// 															await delete_livestream(live.id)
// 															notification.success({
// 																message: 'Operation: Delete livestream',
// 																description: 'Successfully',
// 															})
// 														} catch (error)
// 														{
// 															notification.error({
// 																message: 'Operation: Delete livestream',
// 																description: 'Failed',
// 															})
// 														}
// 													}}
// 													onStopLivestream={async () =>
// 														await stop_livestream(live.id)
// 													}
// 												/>
// 											</List.Item>
// 										)}
// 									/>
// 								</>
// 							)}
// 						/>
// 						{props.has_more() && (
// 							<Row type="flex" justify="center" align="middle">
// 								<Col xs={24} style={{textAlign: 'center'}}>
// 									<Tooltip
// 										title={
// 											searchValue
// 												? 'Kết quả tìm kiếm đang bị giới hạn bởi nội dung tìm kiếm, vui lòng xóa bộ lọc để hiển thị toàn bộ kết quả.'
// 												: ''
// 										}
// 										trigger="click"
// 									>
// 										<Button
// 											loading={props.loading_more}
// 											type="dashed"
// 											icon="vertical-align-bottom"
// 											style={{margin: 10}}
// 											onClick={() => props.load_more()}
// 										>
// 											{props.loading_more ? 'Loading' : 'Show more'}
// 										</Button>
// 									</Tooltip>
// 								</Col>
// 							</Row>
// 						)}
// 					</>
// 				)}
// 		</Card>
// 	)
// }

const LivestreamsListPage = () => (
	<Card style={{ minHeight: '100%' }} title={<BreadCrumb />}>
		<Result
			status="404"
			title="404"
			subTitle="Tính năng này sẽ được cập nhật trong phiên bản kế tiếp"
		/>
	</Card>
)

// const LivestreamsListPage = PaginationWrapper<
// 	{
// 		livestream_tasks: LivestreamConnection
// 	},
// 	{
// 		// injected props
// 	}
// >(
// 	query,
// 	graphql`
// 		fragment LivestreamsListPage_livestream_tasks on Query
// 			@argumentDefinitions(
// 				after: { type: "String" }
// 				first: { type: "Int" }
// 				before_time: { type: "Long" }
// 			) {
// 			livestream_tasks(first: $first, after: $after, before_time: $before_time)
// 				@connection(key: "LivestreamListsPage_livestream_tasks") {
// 				edges {
// 					node {
// 						id
// 						videos {
// 							title
// 							is_livestream
// 							video_id
// 							thumbnail_url
// 							url
// 						}
// 						name
// 						active
// 						status
// 						created_time
// 						title
// 						description
// 						times
// 						loop_times
// 						targets {
// 							rtmps
// 							facebooks {
// 								uid
// 								name
// 								type
// 								owner
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	`,
// 	{
// 		first: 10,
// 	},
// 	({data, loading, error, reload, has_more, load_more, loading_more}) =>
// 	{
// 		if (error && !data)
// 			return (
// 				<Card style={{minHeight: '100%'}} title={<BreadCrumb />}>
// 					<Row type="flex" justify="space-around">
// 						<Col>
// 							<Alert showIcon message={error} type="error" />
// 						</Col>
// 					</Row>
// 				</Card>
// 			)

// 		const livestream_tasks =
// 			data?.livestream_tasks?.edges?.map(edge => edge.node) ?? []
// 		return (
// 			<LivestreamsListView
// 				list={livestream_tasks}
// 				reload={reload}
// 				has_more={has_more}
// 				load_more={load_more}
// 				loading_more={loading_more}
// 				loading={loading}
// 			/>
// 		)
// 	},
// )

export default LivestreamsListPage
