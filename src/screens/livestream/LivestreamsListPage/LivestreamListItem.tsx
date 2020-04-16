import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Popconfirm from 'antd/lib/popconfirm'
import Popover from 'antd/lib/popover'
import Row from 'antd/lib/row'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import Moment from 'react-moment'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { NoteReading } from '../../../components/common/NoteReading'
import { Livestream } from '../../../types'
import './style.css'

export type LivestreamListItem = {
	live: Livestream & { time: any }
	onStopLivestream: Function
	onDeleteLivestream: Function
}

export const LivestreamListItem = withRouter(
	(props: LivestreamListItem & RouteComponentProps) => {
		return (
			<Card
				hoverable
				bordered
				cover={
					<Link
						to={{
							state: {
								id: props.live?.id,
							},
							pathname: '/livestream/detail-livestream',
						}}
					>
						<img
							src={props.live.videos[0].thumbnail_url}
							style={{ width: '100%' }}
						/>
					</Link>
				}
				type="inner"
				headStyle={{ padding: 5, textAlign: 'left', cursor: 'auto' }}
				bodyStyle={{ cursor: 'auto' }}
				size="small"
				title={<Text>{props.live.name}</Text>}
				extra={
					<>
						{props.live.status == 'playing' && (
							<Icon
								type="video-camera"
								theme="filled"
								style={{ color: '#ff5722', fontSize: 20 }}
								className="flash"
							/>
						)}
						{props.live.status == 'created' &&
							!!props.live.times.filter(time => time > Date.now()).length && (
								<Icon
									type="clock-circle"
									theme="filled"
									style={{ color: 'grey', fontSize: 20 }}
								/>
							)}
						{props.live.status == 'created' &&
							props.live.times.every(time => time < Date.now()) && (
								<Icon
									type="check-circle"
									theme="filled"
									style={{ color: 'green', fontSize: 20 }}
								/>
							)}
					</>
				}
				actions={
					props.live.status == 'created' &&
					props.live.times.every(time => time < Date.now())
						? [
								<Popconfirm
									placement="topRight"
									title="Do you want to delete this campaign?"
									onConfirm={() => props.onDeleteLivestream()}
									okText="Yes"
									cancelText="No"
								>
									<Icon type="delete" style={{ color: 'red' }} />
								</Popconfirm>,
						  ]
						: props.live.status === 'playing'
						? [
								<Link
									to={{
										pathname: '/livestream/update-livestream',
										state: { live: props.live },
									}}
								>
									<Icon type="edit" style={{ color: '#1890ff' }} key="edit" />
								</Link>,
								<Popconfirm
									placement="topRight"
									title="Do you want to stop this campaign?"
									onConfirm={() => props.onStopLivestream()}
									okText="Yes"
									cancelText="No"
								>
									<Icon type="pause-circle" style={{ color: 'red' }} />
								</Popconfirm>,
								<Popconfirm
									placement="topRight"
									title="Do you want to delete this campaign?"
									onConfirm={() => props.onDeleteLivestream()}
									okText="Yes"
									cancelText="No"
								>
									<Icon type="delete" style={{ color: 'red' }} />
								</Popconfirm>,
						  ]
						: [
								<Link
									to={{
										pathname: '/livestream/update-livestream',
										state: { live: props.live },
									}}
								>
									<Icon type="edit" style={{ color: '#1890ff' }} key="edit" />
								</Link>,
								<Popconfirm
									placement="topRight"
									title="Do you want to delete this campaign?"
									onConfirm={() => props.onDeleteLivestream()}
									okText="Yes"
									cancelText="No"
								>
									<Icon type="delete" style={{ color: 'red' }} />
								</Popconfirm>,
						  ]
				}
			>
				<Row>
					<Col xs={24}>
						<Row>
							<Col span={12}>
								<Text strong>Title</Text>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								{props.live?.title}
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<Row>
							<Col span={12}>
								<Text strong>Created</Text>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								{props.live.created_time && (
									<Moment toNow>{props.live.created_time}</Moment>
								)}
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<Row>
							<Col span={12}>
								<Text strong>Next</Text>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Popover
									content={
										<>
											<div>
												Progress:{' '}
												{
													props.live.times.filter(time => time < Date.now())
														.length
												}
												/{props.live.times.length}
											</div>
											<div>
												{props.live.times[props.live.times.length - 1] >=
													Date.now() && (
													<>
														<span>Next: </span>
														<Moment format="DD/MM/YYYY H:mm">
															{props.live.times.reduce((a, b) => {
																const mile = Date.now()
																return b - mile <= a - mile
																	? b - mile < 0
																		? a
																		: b
																	: a - mile < 0
																	? b
																	: a
															})}
														</Moment>
													</>
												)}
											</div>
										</>
									}
								>
									<span>
										{props.live.times[props.live.times.length - 1] >=
										Date.now() ? (
											<Moment format="DD/MM/YYYY H:mm">
												{props.live.times.reduce((a, b) => {
													const mile = Date.now()
													return b - mile <= a - mile
														? b - mile < 0
															? a
															: b
														: a - mile < 0
														? b
														: a
												})}
											</Moment>
										) : (
											'_'
										)}
									</span>
								</Popover>
							</Col>
						</Row>
					</Col>
				</Row>
				<NoteReading collapse={true} note={props.live?.description} />
			</Card>
		)
	},
)
