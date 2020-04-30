import {Alert, Avatar, Card, Col, Icon, List, Row, Skeleton, Popconfirm} from 'antd'
import {graphql} from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {Fab} from 'react-tiny-fab'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {VipViewersLivestream, VipViewersLivestreamConnection} from '../../../types'
import {CUModal} from './CUModal'
import {ViewModal} from './ViewModal'
import {VipViewersLivestreamReport, VipViewersLivestreamReportStatusFilter} from './VipViewersLivestreamReport'
import {delete_vip_viewers_livestream} from '../../../graphql/delete_vip_viewers_livestream'

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
					payment_history {
						time
						amount
						max_duration
						max_live_per_day
						parallel
						price
					}
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

	const [deletingVip, setDeletingVip] = useState<string | null>(null)

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

	const list = props.data.vip_viewers_livestream_tasks.edges
		.map(e => e.node)
		.filter(
			e =>
				e.id.includes(props.search) ||
				e.name.toLowerCase().includes(props.search)
		)
		.filter(e => status_filter == "active"
			? e.active == true
			: status_filter == "expired_in_5_days"
				? Math.ceil((e.end_time - Date.now()) / 1000 / 86400) <= 5
				: status_filter == "expired"
					? e.end_time < Date.now()
					: true
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
								loading={item.id == deletingVip}
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
									/>,
									<Popconfirm
										title="Are you sure delete this subscription?"
										onConfirm={async () => {
											setDeletingVip(item.id)
											await delete_vip_viewers_livestream(item.id)
											setDeletingVip(null)
										} }
										okText="Yes"
										cancelText="No"
									>
										<Icon
											style={{color: 'red'}}
											type="delete"
											key="remove"
										/>
									</Popconfirm>
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
