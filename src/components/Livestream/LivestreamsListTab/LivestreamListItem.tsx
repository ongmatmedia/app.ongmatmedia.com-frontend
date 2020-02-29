import React from 'react';
import { Avatar, Icon, Card, Popconfirm } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Moment from 'react-moment';
import { Livestream } from '../../../types';

export type LivestreamListItem = {
  live: Livestream;
  onEdit: Function;
  onPause: Function;
  onDelete: Function;
};

export const LivestreamListItem = (props: LivestreamListItem) => (
  <Card
    hoverable
    bordered
    cover={<img src={props.live.videos[0].thumbnail_url} style={{width: "100%"}} />}
    actions={[
      ...(props.live.status === 'created'
        ? [
            <Icon
              type="edit"
              style={{ color: '#1890ff' }}
              key="edit"
              onClick={() => props.onEdit()}
            />,
          ]
        : []),
      <Popconfirm
        placement="topRight"
        title="Do you want to delete this task"
        onConfirm={() => props.onDelete()}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="delete" style={{ color: 'red' }} />
      </Popconfirm>,
    ]}
  >
    <Meta
      title={
        <span>
          {props.live.status == 'playing' && (
            <Avatar
              src="https://loading.io/spinners/equalizer/lg.equalizer-bars-loader.gif"
              size="large"
              style={{ marginRight: 10 }}
            />
          )}
          {props.live.status == 'created' && (
            <Avatar
              src="https://www.pikpng.com/pngl/b/49-491478_flat-clock-icon-png-clock-icon-transparent-png.png"
              size="large"
              style={{ marginRight: 5, width: 20, height: 20 }}
            />
          )}
          {props.live.status == 'paused' && (
            <Avatar
              src="https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png"
              size="small"
              style={{ marginRight: 10 }}
            />
          )}

          <span>
            <Moment format="DD/MM/YYYY H:mm">{new Date() as any}</Moment>
          </span>
        </span>
      }
      description={<span>{props.live.name}</span>}
    />
  </Card>
);
