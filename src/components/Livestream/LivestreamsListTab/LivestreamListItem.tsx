import React from 'react';
import { Avatar, Icon, Card, Popconfirm, Button, Popover } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Moment from 'react-moment';
import { Livestream } from '../../../types';

export type LivestreamListItem = {
  live: Livestream;
  onEdit: Function;
  onPause: Function;
  onDelete: Function;
};

export const LivestreamListItem = (props: LivestreamListItem) => (console.log({ props }), (
  <Card
    hoverable
    bordered
    cover={<img src={props.live.videos[0].thumbnail_url} style={{ width: "100%" }} />}
    actions={props.live.status == 'created' && props.live.times.every(time => time < Date.now()) ? [<Button disabled>Livestream is ended</Button>] : [
      <Icon
        type="edit"
        style={{ color: '#1890ff' }}
        key="edit"
        onClick={() => props.onEdit()}
      />,
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
              src="https://www.tvcnews.tv/wp-content/uploads/2017/07/live.gif"
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
          {props.live.status == 'created' && props.live.times.every(time => time < Date.now()) && (
            <Avatar
              src="https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png"
              size="small"
              style={{ marginRight: 10 }}
            />
          )}

          <Popover
            content={
              <>
                <div>Progress: {props.live.times.filter(time => time < Date.now()).length}/{props.live.times.length}</div>
                <div>
                  {props.live.times[props.live.times.length - 1] >= Date.now() &&
                    <>
                      <span>Next: </span>
                      <Moment format="DD/MM/YYYY H:mm">{props.live.times.reduce((a, b) => {
                        const mile = Date.now()
                        return b - mile <= a - mile ? b - mile < 0 ? a : b : a - mile < 0 ? b : a
                      })}</Moment>
                    </>
                  }
                </div>
              </>
            }
            title={<span>Campaign: {props.live.name}</span>}>
            <span>
              {
                props.live.times[props.live.times.length - 1] >= Date.now() ? (
                  <Moment format="DD/MM/YYYY H:mm">{props.live.times.reduce((a, b) => {
                    const mile = Date.now()
                    return b - mile <= a - mile ? b - mile < 0 ? a : b : a - mile < 0 ? b : a
                  })}</Moment>
                ) : (
                    <span>--/--/-- --:--</span>
                  )
              }
            </span>
          </Popover>
        </span>
      }
      description={<span>{props.live.title}</span>}
    />
  </Card>
))
