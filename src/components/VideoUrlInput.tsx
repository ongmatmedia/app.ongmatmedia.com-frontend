import { Alert, Col, Icon, Input, Row } from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { VideoInfo } from '../types';
import { GraphQLQueryFetcher } from '../graphql/GraphQLWrapper'

interface VideoUrlInputProps {
    onSubmitVideo: (videoInfo: VideoInfo & { url: string }) => void,
}

const VideoUrlInputQuery = graphql`
  query VideoUrlInputQuery($url: String!) {
    video_info(url: $url) {
      id,
      title,
      description,
      duration,
      thumbnail,
      livestreaming,
      owner {
        id,
        name,
        avatar
      }
    }
  }
`

export const VideoUrlInput = (props: VideoUrlInputProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videoUrlValue, setvideoUrlValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const fetchVideoInfo = async () => {
        setIsLoading(true)
        try {
            const data = await GraphQLQueryFetcher<{ video_info: VideoInfo }>(
                VideoUrlInputQuery,
                { url: videoUrlValue.match(/^[0-9]+$/) ? `https://www.facebook.com/someone/videos/${videoUrlValue}` : videoUrlValue }
            )

            props.onSubmitVideo({
                ...data.video_info,
                url: videoUrlValue
            })
        } catch (error) {
            console.log(error)
            setError(error)
        }
        setIsLoading(false)
        setvideoUrlValue('')
    }

    return (
        <Row>
            <Col span={24}>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
                <Input
                    value={videoUrlValue}
                    onChange={e => setvideoUrlValue(e.target.value)}
                    addonAfter={<Icon type={isLoading ? 'loading' : 'search'} onClick={fetchVideoInfo} />}
                    onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
                    disabled={isLoading}
                />
            </Col>
        </Row>
    )
}