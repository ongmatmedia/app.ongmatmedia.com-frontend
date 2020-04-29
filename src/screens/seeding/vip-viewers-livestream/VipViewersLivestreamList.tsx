import {Alert, Avatar, Badge, Card, Col, Icon, List, Row, Skeleton, Tooltip} from 'antd'
import {graphql} from 'babel-plugin-relay/macro'
import React, {Fragment, useState} from 'react'
import {Fab} from 'react-tiny-fab'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {VipViewersLivestream, VipViewersLivestreamConnection} from '../../../types'
import {CUModal} from './CUModal'
import {ViewModal} from './ViewModal'
import {VipViewersLivestreamReport, VipViewersLivestreamReportStatusFilter} from './VipViewersLivestreamReport'

const query = graphql`
	query VipViewersLivestreamListQuery {
		vip_viewers_livestream_tasks {
			edges {
				node {
					id
					active
					name
					amount
					end_time
					max_duration
					max_live_per_day
					parallel
					created_time
				}
			}
		}
	}
`

export const VipViewersLivestreamList = GraphQLWrapper<
	{vip_viewers_livestream_tasks: VipViewersLivestreamConnection},
	{search: string}
>(query, {}, props =>
{
	const [editingVipViewerLivestream, setEditingVipViewerLivestream] = useState<VipViewersLivestream | null>(
		null,
	)
	const [viewingVipViewerLivestream, setViewingVipViewerLivestream] = useState<VipViewersLivestream | null>(
		null,
	)
	const [status_filter, set_status_filter] = useState<
		VipViewersLivestreamReportStatusFilter
	>('all')

	const [
		createUpdateVipViewersLivestreamModalIsVisible,
		setCreateUpdateVipViewersLivestreamModalIsVisible,
	] = useState<boolean>(false)

	if (props.error)
	{
		return (
			<Alert
				showIcon
				type="error"
				message={JSON.parse(props.error)?.errors[0].message}
			/>
		)
	}
	if (props.loading && !props.data && !props.error)
		return <Skeleton active loading paragraph={{rows: 5}} />

	let list: VipViewersLivestream[] = []
	list = props.data.vip_viewers_livestream_tasks.edges
		.map(e => e.node)
		.filter(
			e =>
				e.id.includes(props.search) ||
				e.name.toLowerCase().includes(props.search),
		)

	return (
		props.data && (
			<>
				{createUpdateVipViewersLivestreamModalIsVisible && (
					<CUModal
						mode={editingVipViewerLivestream ? 'update' : 'create'}
						onClose={() =>
						{
							setEditingVipViewerLivestream(null)
							setCreateUpdateVipViewersLivestreamModalIsVisible(false)
						}}
						vip={editingVipViewerLivestream}
					/>
				)}
				{viewingVipViewerLivestream && (
					<ViewModal
						onClose={() => setViewingVipViewerLivestream(null)}
						person={viewingVipViewerLivestream}
						onClick={video_id =>
						{
							console.log(video_id)
						}}
					/>
				)}
				{!createUpdateVipViewersLivestreamModalIsVisible && !viewingVipViewerLivestream && (
					<Fab
						mainButtonStyles={{backgroundColor: 'rgb(64, 169, 255)'}}
						icon={<Icon type="plus" />}
						event="click"
						onClick={() =>
							setCreateUpdateVipViewersLivestreamModalIsVisible(true)
						}
					/>
				)}
				<VipViewersLivestreamReport
					vips={
						props.data
							? props.data.vip_viewers_livestream_tasks.edges.map(e => e.node)
							: []
					}
					filter={status_filter}
					on_change={set_status_filter}
				/>
				<List
					grid={{
						xs: 1,
						sm: 2,
						md: 3,
						lg: 4,
					}}
					rowKey="uid"
					dataSource={list}
					renderItem={item => (
						<List.Item style={{margin: 5}}>
							<Card
								type="inner"
								hoverable
								size="small"
								actions={[
									<Icon
										type="eye"
										key="eye"
										onClick={() => setViewingVipViewerLivestream(item)}
									/>,
									<Icon
										type="edit"
										key="edit"
										onClick={() =>
										{
											setCreateUpdateVipViewersLivestreamModalIsVisible(true)
											setEditingVipViewerLivestream(item)
										}}
									/>
								]}
							>
								<Row type="flex" justify="start" align="middle">
									<Col>
										<Avatar
											src={`http://graph.facebook.com/${item.id}/picture?type=large`}
											size={65}
										/>
									</Col>
									<Col
										style={{
											paddingLeft: 10,
											overflowWrap: 'break-word',
											lineHeight: '2em',
										}}
									>
										<Row>
											<Col>{item.name}</Col>
										</Row>
									</Col>
								</Row>
							</Card>
						</List.Item>
					)}
				/>
			</>
		)
	)
})
