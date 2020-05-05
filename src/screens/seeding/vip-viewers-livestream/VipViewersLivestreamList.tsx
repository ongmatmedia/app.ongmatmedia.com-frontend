import {Avatar, Card, Col, Icon, List, notification, Popconfirm, Row} from 'antd'
import React, {useState} from 'react'
import {Fab} from 'react-tiny-fab'
import {delete_vip_viewers_livestream} from '../../../graphql/delete_vip_viewers_livestream'
import {VipViewersLivestream} from '../../../types'
import {CUModal} from './CUModal'
import {ViewModal} from './ViewModal'

interface VipViewersLivestreamListProps {
	data: VipViewersLivestream[]
}

export const VipViewersLivestreamList = (props: VipViewersLivestreamListProps) =>
{
	const [editingVipViewerLivestream, setEditingVipViewerLivestream] = useState<VipViewersLivestream | null>(
		null,
	)
	const [viewingVipViewerLivestream, setViewingVipViewerLivestream] = useState<VipViewersLivestream | null>(
		null,
	)

	const [
		createUpdateVipViewersLivestreamModalIsVisible,
		setCreateUpdateVipViewersLivestreamModalIsVisible,
	] = useState<boolean>(false)

	const [deletingVip, setDeletingVip] = useState<string | null>(null)

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
						vip={viewingVipViewerLivestream}
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
				<List
					grid={{
						xs: 1,
						sm: 2,
						md: 3,
						lg: 4,
					}}
					rowKey="uid"
					dataSource={props.data}
					renderItem={item => (
						<List.Item style={{margin: 5}}>
							<Card
								type="inner"
								hoverable
								size="small"
								style={{cursor: 'default'}}
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
										onConfirm={async () =>
										{
											setDeletingVip(item.id)
											try
											{
												await delete_vip_viewers_livestream(item.id)
												notification.success({
													message: 'Operation: Delete vip subscription',
													description: `${item.id}`
												})
											} catch (error)
											{
												notification.error({
													message: 'Operation: Delete vip subscription',
													description: `${item.id}`
												})
											}
											setDeletingVip(null)
										}
										}
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
}
