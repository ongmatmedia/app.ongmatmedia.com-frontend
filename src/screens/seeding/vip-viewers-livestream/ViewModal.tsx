import {Avatar, Button, Card, Col, Icon, List, message, Modal, notification, Popconfirm, Row, Spin, Tooltip, Alert, Tabs, Result, Table, Statistic, Skeleton} from 'antd'
import React, {useEffect, useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {isMobile, isMobileOnly, isTablet} from 'react-device-detect'
import {delete_vip_viewers_livestream} from '../../../graphql/delete_vip_viewers_livestream'
import {VipViewersLivestream, VipViewersLivestreamOrder} from '../../../types'
import {graphql} from 'babel-plugin-relay/macro'
import {GraphQLQueryFetcher, SmartGrahQLQueryRenderer} from '../../../graphql/GraphQLWrapper'
import {GraphQLError} from '../../../graphql/GraphqlError'

const query = graphql`
	query ViewModalGetPaymentHistoryQuery($id: String!) {
		vip_viewers_livestream_task(id: $id) {
			user_id
			id
			payment_history {
				created_at
				amount
				max_duration
				bought
				price
			}
		}
	}
`

export type ViewModalProps = {
	onClose: Function
	vip: VipViewersLivestream
	setCreateUpdateVipViewersLivestreamModalIsVisible: Function
	setEditingVipViewerLivestream: Function
}

interface VideoProps
{
	video_id: String
	current_viewers: number
	title: string
	description: string
	status: 'playing' | 'loading' | 'paused'
	thumbnail: string
}

const videos: VideoProps[] = [
	{
		video_id: '123456789',
		thumbnail:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Video description',
		title: 'Video title',
		current_viewers: 300,
		status: 'playing',
	},
	{
		video_id: '123456789',
		thumbnail:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Video description',
		title: 'Video title',
		current_viewers: 300,
		status: 'loading',
	},
	{
		video_id: '123456789',
		thumbnail:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Video description',
		title: 'Video title',
		current_viewers: 300,
		status: 'paused',
	},
	{
		video_id: '123456789',
		thumbnail:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Video description',
		title: 'Video title',
		current_viewers: 300,
		status: 'paused',
	},
]

const ListVideos = (props: {dataSource: VideoProps[]}) => (
	<List
		className="list-videos"
		itemLayout="horizontal"
		dataSource={props.dataSource.map((video, index) => ({video, index}))}
		renderItem={({
			video: {
				status,
				thumbnail,
				title,
				current_viewers,
				description,
				video_id,
			},
		}) => (
				<List.Item
					actions={[
						status === 'loading' ? (
							<Icon type="loading" style={{fontSize: 25}} />
						) : status === 'paused' ? (
							<Tooltip placement="top" title="Click to play">
								<Icon
									type="pause-circle"
									style={{fontSize: 25}}
								/>
							</Tooltip>
						) : (
									<Tooltip placement="top" title="Click to pause">
										<Icon
											type="play-circle"
											style={{fontSize: 25}}
										/>
									</Tooltip>
								),
					]}
				>
					<List.Item.Meta
						avatar={<Avatar src={thumbnail} />}
						title={title}
						description={description}
					/>
					<div>{current_viewers}</div>
				</List.Item>
			)}
	/>
)

export const ViewModal = (props: ViewModalProps) =>
{
	const [isLoadingVideos, setLoadingVideos] = useState<boolean>(false)
	const [videosArray, setVideosArray] = useState<VideoProps[]>()
	const [isDeletingVip, setIsDeletingVip] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [paymentHistory, setPaymentHistory] = useState<VipViewersLivestreamOrder[]>()

	useEffect(() =>
	{
		setLoadingVideos(true)
		setVideosArray(videos)
		setLoadingVideos(false)
	}, [videosArray])

	return (
		<Modal
			visible={true}
			destroyOnClose
			closable={false}
			onCancel={() => props.onClose()}
			title={null}
			width={isMobileOnly ? '100%' : isTablet ? '80%' : '50%'}
			style={{top: isMobile ? 0 : 20}}
			footer={[
				<Popconfirm
					title="Are you sure delete this vip?"
					onConfirm={async () =>
					{
						setIsDeletingVip(true)
						try
						{
							await delete_vip_viewers_livestream(props.vip.id)
							props.onClose()
							notification.success({
								message: 'Operation: Delete vip subscription',
								description: `${props.vip.id}`,
							})
						} catch (error)
						{
							setError(error)
						}
						setIsDeletingVip(false)
					}}
					okText="Yes"
					cancelText="No"
				>
					<Button type="danger" disabled={isDeletingVip} style={{marginRight: 10}} >
						<Icon style={{color: 'red'}} type={isDeletingVip ? 'loading' : "delete"} key="remove" />
						{' '}
						Delete vip
					</Button>
				</Popconfirm>,
				<Button
					type="primary"
					disabled={isDeletingVip}
					onClick={() =>
					{
						props.onClose()
						props.setCreateUpdateVipViewersLivestreamModalIsVisible(true)
						props.setEditingVipViewerLivestream(props.vip)
					}}
				>
					<Icon
						type="edit"
						key="edit"
					/>
					{' '}
					Edit vip
				</Button>,
			]}
		>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="Order" key="1">
					<Row gutter={16} style={{marginBottom: 15, textAlign: 'center'}}>
						<Col xs={24} sm={12}>
							<Statistic
								title="ID"
								value={props.vip?.id}
								formatter={value => value}
							/>
						</Col>
						<Col xs={24} sm={12}>
							<Statistic
								title="Remaining times"
								value={props.vip?.livestream_nums - props.vip?.livestream_used_nums}
							/>
						</Col>
					</Row>
					<Card
						style={{marginTop: 10, width: '100%'}}
						actions={[
							<CopyToClipboard
								text={props.vip?.id}
								onCopy={() => message.info('UID copied')}
							>
								<Icon
									type="copy"
									style={{
										color: 'black',
										marginRight: 10,
										fontSize: 20,
										cursor: 'pointer',
									}}
								/>
							</CopyToClipboard>,
							<Icon
								type="message"
								style={{
									color: 'black',
									marginRight: 10,
									fontSize: 20,
									cursor: 'pointer',
								}}
								onClick={() => window.open(`https://m.me/${props.vip?.id}`)}
							/>,
							<Icon
								type="facebook"
								style={{
									color: 'black',
									fontSize: 20,
									cursor: 'pointer',
								}}
								onClick={() => window.open(`https://fb.com/${props.vip?.id}`)}
							/>,
						]}
					>
						<Card.Meta
							avatar={
								<Avatar
									src={`http://graph.facebook.com/${props.vip?.id}/picture?type=large`}
									size={40}
								/>
							}
							title={props.vip?.name}
							description={`UID: ${props.vip?.id}`}
						/>
					</Card>
					{
						!!error && (
							<Alert message={error} showIcon type="error" />
						)
					}
					<SmartGrahQLQueryRenderer<{vip_viewers_livestream_task: {user_id: string, id: string, payment_history: VipViewersLivestreamOrder[]}}>
						query={query}
						variables={{id: props.vip.id}}
						render={({data, loading, error}) => (
							<Skeleton loading={loading && !error} active>
								{
									error ? (
										<Alert style={{marginTop: 15}} showIcon type="error" message={(error as any).errors} />
									) : (
											<Table
												style={{marginBottom: 20, marginTop: 20}}
												bordered
												pagination={false}
												dataSource={(data?.vip_viewers_livestream_task?.payment_history.slice() ?? []).sort((a, b) => (a.created_at < b.created_at ? 1 : -1)).map(({created_at, ...rest}) => ({created_at: new Date(created_at).toLocaleString('vi'), ...rest}))}
												columns={[
													{
														title: 'Updated',
														dataIndex: 'created_at',
														key: 'created_at',
														fixed: 'left',
														width: 100,
													},
													{
														title: 'Amount',
														dataIndex: 'amount',
														key: 'amount',
													},
													{
														title: 'Max duration',
														dataIndex: 'max_duration',
														key: 'max_duration',
													},
													{
														title: 'Bought',
														dataIndex: 'bought',
														key: 'bought',
													},
													{
														title: 'Price',
														dataIndex: 'price',
														key: 'price',
														fixed: 'right',
														width: 100,
													},
												]}
												scroll={{x: 500}}
											/>
										)
								}
							</Skeleton>
						)}
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Report" key="2">
					<Result
						status="404"
						title="404"
						subTitle="Tính năng đang trong quá trình phát triển"
					/>
					{/* {isLoadingVideos && !videosArray ? (
						<Row align="middle" type="flex" justify="center">
							<Col>
								<Spin spinning={true} />
							</Col>
						</Row>
					) : (
							<Row>
								{videosArray && (
									<ListVideos dataSource={videosArray} />
								)}
							</Row>
						)} */}
				</Tabs.TabPane>
			</Tabs>
		</Modal>
	)
}
