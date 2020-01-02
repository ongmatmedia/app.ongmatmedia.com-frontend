import React, { useState, useEffect } from 'react';
import {
  Modal,
  Row,
  Col,
  Avatar,
  Typography,
  List,
  Skeleton,
  Icon,
  Divider,
  Tooltip,
  Spin,
} from 'antd';
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream';
import Moment from 'react-moment';

export type ViewModalProps = {
  onClose: Function;
  onClick: (video_id: string) => any;
  person: VIPViewersLivestream;
};

interface VideoProps {
  video_id: String;
  current_viewers: number;
  title: string;
  description: string;
  status: 'playing' | 'loading' | 'paused';
  thumbnail: string;
}

const { Text } = Typography;

const TextCustom = props => <Text style={{ display: 'block' }}>{props.content}</Text>;

const videos: VideoProps[] = [
  {
    video_id: '123456789',
    thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Video description',
    title: 'Video title',
    current_viewers: 300,
    status: 'playing',
  },
  {
    video_id: '123456789',
    thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Video description',
    title: 'Video title',
    current_viewers: 300,
    status: 'loading',
  },
  {
    video_id: '123456789',
    thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Video description',
    title: 'Video title',
    current_viewers: 300,
    status: 'paused',
  },
  {
    video_id: '123456789',
    thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Video description',
    title: 'Video title',
    current_viewers: 300,
    status: 'paused',
  },
];

const ListVideos = (props: { dataSource: VideoProps[]; onClick: Function }) => (
  <List
    className="list-videos"
    itemLayout="horizontal"
    dataSource={props.dataSource.map((video, index) => ({ video, index }))}
    renderItem={({
      video: { status, thumbnail, title, current_viewers, description, video_id },
    }) => (
      <List.Item
        actions={[
          status === 'loading' ? (
            <Icon type="loading" style={{ fontSize: 25 }} />
          ) : status === 'paused' ? (
            <Tooltip placement="top" title="Click to play">
              <Icon
                type="pause-circle"
                style={{ fontSize: 25 }}
                onClick={() => props.onClick(video_id)}
              />
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="Click to pause">
              <Icon
                type="play-circle"
                style={{ fontSize: 25 }}
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
);

export const ViewModal = (props: ViewModalProps) => {
  const [isLoadingVideos, setLoadingVideos] = useState<boolean>(false);
  const [videosArray, setVideosArray] = useState<VideoProps[]>();

  useEffect(() => {
    setLoadingVideos(true);
    setVideosArray(videos);
    setLoadingVideos(false);
  }, [videosArray]);

  return (
    <Modal
      visible={true}
      destroyOnClose
      closable={false}
      onCancel={() => props.onClose()}
      title="View Vip Viewers Livestream"
    >
      <Row type="flex" align="middle">
        <Col span={4}>
          <Avatar
            src={`http://graph.facebook.com/${props.person.id}/picture?type=large`}
            size={65}
          />
        </Col>
        <Col span={20}>
          <TextCustom content={props.person.name} />
          <TextCustom
            content={<Moment format="DD/MM/YYYY H:mm">{props.person.created_time}</Moment>}
          />
          <TextCustom content={<Moment format="DD/MM/YYYY H:mm">{props.person.end_time}</Moment>} />
          <TextCustom content={props.person.amount} />
        </Col>
      </Row>
      <Divider />
      {isLoadingVideos && !videosArray ? (
        <Row align="middle" type="flex" justify="center">
          <Col>
            <Spin spinning={true} />
          </Col>
        </Row>
      ) : (
        <Row>{videosArray && <ListVideos dataSource={videosArray} onClick={props.onClick} />}</Row>
      )}
    </Modal>
  );
};
