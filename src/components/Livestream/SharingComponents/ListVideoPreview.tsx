import React from 'react'
import { LivestreamVideo } from '../../../types'
import { Row, Col, Avatar, Icon } from 'antd'

interface ListVideoPreviewProps {
	onChange: (videos: LivestreamVideo[]) => void
	videosInfo: LivestreamVideo[]
}

export const ListVideoPreview = (props: ListVideoPreviewProps) => (
	<>
		{props.videosInfo.map((v, i) => (
			<Row
				key={i}
				type="flex"
				gutter={24}
				justify="space-between"
				align="middle"
				style={{ padding: 10 }}
			>
				<Col xs={10}>
					{' '}
					<img src={v.thumbnail_url} style={{ width: '100%' }} />{' '}
				</Col>
				<Col xs={12}>
					{v.title}
					{v.is_livestream && (
						<Avatar
							src="https://cdn4.iconfinder.com/data/icons/remains/100/facebook_live_icon-2-512.png"
							style={{ marginLeft: 5, fontSize: 10 }}
						/>
					)}
				</Col>
				<Col xs={2}>
					<Icon
						type="delete"
						style={{ fontSize: 20, cursor: 'pointer', color: 'red' }}
						onClick={() => {
							props.onChange([
								...props.videosInfo.filter(
									v => props.videosInfo.indexOf(v) !== i,
								),
							])
						}}
					/>
				</Col>
			</Row>
		))}
	</>
)
