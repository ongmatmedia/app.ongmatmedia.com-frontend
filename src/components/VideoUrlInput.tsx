import Alert from 'antd/lib/alert'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { GraphQLQueryFetcher } from '../graphql/GraphQLWrapper'
import { VideoInfo } from '../types'

interface VideoUrlInputProps {
	onSubmitVideo: (videoInfo: VideoInfo & { url: string }) => void
}

const VideoUrlInputQuery = graphql`
	query VideoUrlInputQuery($url: String!) {
		video_info(url: $url) {
			id
			video_id
			title
			description
			duration
			thumbnail
			livestreaming
			owner {
				id
				name
				avatar
			}
		}
	}
`

export const VideoUrlInput = (props: VideoUrlInputProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [videoUrlValue, setvideoUrlValue] = useState<string>('')
	const [error, setError] = useState<string>('')

	const fetchVideoInfo = async () => {
		setIsLoading(true)
		try {
			const data = await GraphQLQueryFetcher<{ video_info: VideoInfo }>(
				VideoUrlInputQuery,
				{
					url: videoUrlValue.match(/^[0-9]+$/)
						? `https://www.facebook.com/someone/videos/${videoUrlValue}`
						: videoUrlValue,
				},
			)

			props.onSubmitVideo({
				...data.video_info,
				url: videoUrlValue,
			})
			setError('')
		} catch (error) {
			setError(
				JSON.parse(error)
					.errors.map(e => `[${e.errorType}] ${e.message}`)
					.join('\n'),
			)
		}
		setIsLoading(false)
		setvideoUrlValue('')
	}

	return (
		<Row>
			<Col span={24}>
				{error && (
					<Alert
						message={error}
						type="error"
						showIcon
						style={{ marginBottom: 10 }}
					/>
				)}
				<Input
					value={videoUrlValue}
					onChange={e => setvideoUrlValue(e.target.value)}
					placeholder="Video URL"
					addonAfter={
						<Icon
							type={isLoading ? 'loading' : 'search'}
							onClick={fetchVideoInfo}
						/>
					}
					onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
					disabled={isLoading}
				/>
			</Col>
		</Row>
	)
}
