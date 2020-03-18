import React, { Fragment, useState } from 'react'
import { Row, Col, Spin, List, Card, Avatar, Tag, Tooltip, Icon } from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import { CUModal } from './CUModal'
import Moment from 'react-moment'
import {
	VipViewersLivestreamReport,
	VipViewersLivestreamReportStatusFilter,
} from './VipViewersLivestreamReport'
import { Badge } from 'antd'
import { ViewModal } from './ViewModal'
import {
	VipViewersLivestreamConnection,
	VipViewersLivestream,
} from '../../../types'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'

const query = graphql`
	query VipViewersLivestreamListQuery {
		vip_viewers_livestream_tasks {
			edges {
				node {
					id
					active
					amount
					note
					name
					bought_mins
					created_time
					updated_time
				}
			}
		}
	}
`

export const VipViewersLivestreamList = GraphQLWrapper<
	{ vip_viewers_livestream_tasks: VipViewersLivestreamConnection },
	{ search: string }
>(query, {}, props => {
	const [editing_vip, set_editing_vip] = useState<VipViewersLivestream | null>(
		null,
	)
	const [viewing_vip, set_viewing_vip] = useState<VipViewersLivestream | null>(
		null,
	)
	const [status_filter, set_status_filter] = useState<
		VipViewersLivestreamReportStatusFilter
	>('all')

	if (props.loading) {
		return (
			<Row align="middle" type="flex" justify="center">
				<Col>
					<Spin spinning={true} />
				</Col>
			</Row>
		)
	}
	let list: VipViewersLivestream[] = []
	if (props.data) {
		list = props.data.vip_viewers_livestream_tasks.edges
			.map(e => e.node)
			.filter(
				e =>
					e.id.includes(props.search) ||
					e.name.toLowerCase().includes(props.search),
			)
	}
	const now = Date.now()

	return (
		props.data && (
			<Fragment>
				{editing_vip && (
					<CUModal
						mode="update"
						onClose={() => set_editing_vip(null)}
						vip={editing_vip}
					/>
				)}
				{viewing_vip && (
					<ViewModal
						onClose={() => set_viewing_vip(null)}
						person={viewing_vip}
						onClick={video_id => {
							console.log(video_id)
						}}
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
						md: 4,
						lg: 4,
						xl: 8,
						xxl: 8,
					}}
					rowKey="uid"
					pagination={{
						pageSizeOptions: [
							'5',
							'10',
							'20',
							'30',
							'50',
							'100',
							'200',
							'300',
							'400',
							'500',
							'1000',
						],
						showSizeChanger: true,
					}}
					dataSource={list}
					renderItem={item => (
						<List.Item style={{ margin: 5 }}>
							<Card
								type="inner"
								hoverable
								size="small"
								actions={[
									<Tooltip placement="bottom" title="Click to view">
										<Icon
											type="eye"
											key="eye"
											onClick={() => set_viewing_vip(item)}
										/>
									</Tooltip>,
									<Tooltip placement="bottom" title="Click to edit">
										<Icon
											type="edit"
											key="edit"
											onClick={() => set_editing_vip(item)}
										/>
									</Tooltip>,
								]}
							>
								<Row type="flex" justify="start" align="middle">
									<Col>
										<Avatar
											src={`http://graph.facebook.com/${item.id}/picture?type=large`}
											size={65}
										/>
										<Badge
											status="error"
											offset={[-10, -13]}
											style={{ float: 'right', fontSize: 25 }}
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
			</Fragment>
		)
	)
})
