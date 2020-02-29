import { Alert, Avatar, Col, Icon, Input, Row } from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { GraphQLQueryFetcher } from '../../../graphql/GraphQLWrapper';
import { VideoInfo, LivestreamVideoInput, LivestreamVideo } from '../../../types';
import { ListVideoPreview } from './ListVideoPreview';
import { VideoUrlInput } from './VideoUrlInput';
import { values } from 'mobx';

interface VideoComposerProps {
  value: LivestreamVideo[],
  onChange: (videoInput: LivestreamVideoInput[]) => void;
}

export const VideoComposer = ((props: VideoComposerProps) => {

  const [videoUrlInputValue, setvideoUrlInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);

  const submitVideoUrl = async () => {
    const videoInfo: { video_info: VideoInfo } = await GraphQLQueryFetcher(graphql`
      query VideoComposerQuery($url: String!) {
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
    `, { url: videoUrlInputValue })

    const { video_info: {title, livestreaming, id, thumbnail } } = videoInfo

    props.onChange([...props.value, {
      title,
      is_livestream: livestreaming,
      video_id: id,
      thumbnail_url: thumbnail,
      url: videoUrlInputValue,
    }])

    setvideoUrlInputValue('')
    setIsLoading(false)
  }

  return (
    <Row>
      <Col span={24}>
        {error && (
          <Row>
            <Col span={24}>
              <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />
            </Col>{' '}
          </Row>
        )}

        <VideoUrlInput loading={isLoading} setLoadingButton={status => setIsLoading(status)} onChange={e => setvideoUrlInputValue(e.target.value)} videoUrlValue={videoUrlInputValue} submitVideoUrl={submitVideoUrl} />

        <ListVideoPreview onChange={props.onChange} videosInfo={props.value} />
      </Col>
    </Row>
  );
})