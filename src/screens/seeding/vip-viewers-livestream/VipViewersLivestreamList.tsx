import { Avatar, Card, Col, Icon, List, Row, Tag } from 'antd'
import React, { useState } from 'react'
import { Fab } from 'react-tiny-fab'
import { VipViewersLivestream } from '../../../types'
import { CUModal } from './CUModal'
import { ViewModal } from './ViewModal'

interface VipViewersLivestreamListProps {
	data: VipViewersLivestream[]
}

export const VipViewersLivestreamList = (
	props: VipViewersLivestreamListProps,
) => {
	const [
		editingVipViewerLivestream,
		setEditingVipViewerLivestream,
	] = useState<VipViewersLivestream | null>(null)
	const [
		viewingVipViewerLivestream,
		setViewingVipViewerLivestream,
	] = useState<VipViewersLivestream | null>(null)

	const [
		createUpdateVipViewersLivestreamModalIsVisible,
		setCreateUpdateVipViewersLivestreamModalIsVisible,
	] = useState<boolean>(false)

	return (
		props.data && (
			<>
				{createUpdateVipViewersLivestreamModalIsVisible && (
					<CUModal
						mode={editingVipViewerLivestream ? 'update' : 'create'}
						onClose={() => {
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
						setCreateUpdateVipViewersLivestreamModalIsVisible={
							setCreateUpdateVipViewersLivestreamModalIsVisible
						}
						setEditingVipViewerLivestream={setEditingVipViewerLivestream}
					/>
				)}
				{!createUpdateVipViewersLivestreamModalIsVisible &&
					!viewingVipViewerLivestream && (
						<Fab
							mainButtonStyles={{ backgroundColor: 'rgb(64, 169, 255)' }}
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
						<List.Item style={{ margin: 5 }}>
							<Card
								type="inner"
								hoverable
								size="small"
								onClick={() => setViewingVipViewerLivestream(item)}
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
											<Col>
												{item.active ? (
													<Tag color="rgb(21, 100, 42)">
														Running <Icon type="sync" spin />
													</Tag>
												) : (
													<Tag color="#c01922"> Stopped </Tag>
												)}
											</Col>
											<Col>
												<Tag
													color={
														item.livestream_used_nums == item.livestream_nums
															? 'red'
															: 'green'
													}
												>
													Remain:{' '}
													{item.livestream_nums - item.livestream_used_nums}
												</Tag>
											</Col>
											<Col>
												{new Date(item.created_at).toLocaleString('vi')}
											</Col>
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
