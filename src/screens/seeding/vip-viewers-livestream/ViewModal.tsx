import
{
	Avatar,
	Col,
	Divider,
	Icon,
	List,
	Modal,
	Row,
	Spin,
	Tooltip,
	Typography,
	Card,
	message,
} from 'antd'
import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import {VipViewersLivestream} from '../../../types'
import {isMobile, isMobileOnly, isTablet} from 'react-device-detect'
import {CopyToClipboard} from 'react-copy-to-clipboard'

export type ViewModalProps = {
	onClose: Function
	onClick: (video_id: string) => any
	vip: VipViewersLivestream
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

const {Text} = Typography

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

const ListVideos = (props: {dataSource: VideoProps[]; onClick: Function}) => (
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
									onClick={() => props.onClick(video_id)}
								/>
							</Tooltip>
						) : (
									<Tooltip placement="top" title="Click to pause">
										<Icon
											type="play-circle"
											style={{fontSize: 25}}
											onClick={() => props.onClick(video_id)}
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
			title="Vip Viewers Livestream"
			width={isMobileOnly ? '100%' : isTablet ? '80%' : '50%'}
			style={{top: isMobile ? 0 : 20}}
		>
			<Card
				style={{marginTop: 10, width: "100%"}}
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
						onClick={() =>
							window.open(
								`https://m.me/${
								props.vip?.id
								}`,
							)
						}
					/>,
					<Icon
						type="facebook"
						style={{
							color: 'black',
							fontSize: 20,
							cursor: 'pointer',
						}}
						onClick={() =>
							window.open(
								`https://fb.com/${
								props.vip?.id
								}`,
							)
						}
					/>,
				]}
			>
				<Card.Meta
					avatar={
						<Avatar src={`http://graph.facebook.com/${props.vip?.id}/picture?type=large`} size={40} />
					}
					title={props.vip?.name}
					description={`UID: ${props.vip?.id}`}
				/>
			</Card>
			{isLoadingVideos && !videosArray ? (
				<Row align="middle" type="flex" justify="center">
					<Col>
						<Spin spinning={true} />
					</Col>
				</Row>
			) : (
					<Row>
						{videosArray && (
							<ListVideos dataSource={videosArray} onClick={props.onClick} />
						)}
					</Row>
				)}
		</Modal>
	)
}
