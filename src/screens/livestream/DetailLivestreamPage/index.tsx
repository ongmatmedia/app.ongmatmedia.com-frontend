import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import React from 'react'
import { InfiniteScrollComment } from './InfiniteScrollComment'
import { VideoFeedback } from './VideoFeedback'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

const VideoInfo = (props: {
	item: { status: string; thumbnail: string; title: string }
}) => (
	<Row gutter={16} type="flex" align="middle">
		<Col span={4}>
			<Icon
				type={props.item.status === 'live' ? 'pause-circle' : 'play-circle'}
				style={{ fontSize: 20 }}
			/>
		</Col>
		<Col span={9}>
			<img src={props.item.thumbnail} style={{ width: '100%', height: 150 }} />
		</Col>
		<Col span={11} style={{ paddingLeft: 20 }}>
			{props.item.title}
		</Col>
	</Row>
)

export const DetailLivestreamPage = withRouter(
	({ location: { state } }: RouteComponentProps) => {
		if (!state) return <Redirect to="/livestream" />

		return (
			<Card title={<BreadCrumb />}>
				<Row style={{ minHeight: '100%' }}>
					<Col
						md={8}
						xs="24"
						style={{
							overflow: 'auto',
							minHeight: '100%',
							overflowX: 'hidden',
						}}
					>
						<List
							bordered
							itemLayout="horizontal"
							dataSource={[
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/720x480',
									title: 'Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/150',
									title:
										'Title video Title video Title video Title video Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/150',
									title:
										'Title video Title video Title video Title video Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/150',
									title:
										'Title video Title video Title video Title video Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/150',
									title:
										'Title video Title video Title video Title video Title video',
								},
								{
									status: 'paused',
									thumbnail: 'https://via.placeholder.com/150',
									title: 'Title video',
								},
								{
									status: 'live',
									thumbnail: 'https://via.placeholder.com/150',
									title:
										'Title video Title video Title video Title video Title video',
								},
							]}
							renderItem={item => (
								<List.Item>
									<VideoInfo item={item} />
								</List.Item>
							)}
						/>
					</Col>
					<Col
						md={8}
						xs="24"
						style={{
							height: 'calc(100vh - 170px)',
							overflow: 'auto',
							overflowX: 'hidden',
						}}
					>
						<Card>
							<InfiniteScrollComment />
						</Card>
					</Col>
					<Col
						md={8}
						xs="24"
						style={{
							height: 'calc(100vh - 170px)',
						}}
					>
						<Card>
							<VideoFeedback />
						</Card>
					</Col>
				</Row>
			</Card>
		)
	},
)
