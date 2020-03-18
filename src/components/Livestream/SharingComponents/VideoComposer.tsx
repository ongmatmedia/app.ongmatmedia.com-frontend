import { Col, Row } from 'antd'
import React from 'react'
import {
	LivestreamVideo,
	LivestreamVideoInput,
	VideoInfo,
} from '../../../types'
import { ListVideoPreview } from './ListVideoPreview'
import { VideoUrlInput } from '../../VideoUrlInput'

interface VideoComposerProps {
	value: LivestreamVideo[]
	onChange: (videoInput: LivestreamVideoInput[]) => void
}

export const VideoComposer = (props: VideoComposerProps) => {
	const parseVideoInfo = (videoInfo: VideoInfo & { url: string }) => {
		const { title, livestreaming, id, thumbnail, url } = videoInfo

		props.onChange([
			...props.value,
			{
				title,
				is_livestream: livestreaming,
				video_id: id,
				thumbnail_url: thumbnail,
				url: url,
			},
		])
	}

	return (
		<Row>
			<Col span={24}>
				<VideoUrlInput onSubmitVideo={videoInfo => parseVideoInfo(videoInfo)} />
				<ListVideoPreview onChange={props.onChange} videosInfo={props.value} />
			</Col>
		</Row>
	)
}
