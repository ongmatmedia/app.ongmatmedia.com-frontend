import { Avatar, Col, Empty, Icon, List, Row } from 'antd';
import React from 'react';
import './index.css';
import { LivestreamFacebookTargetType } from './LivestreamFacebookTargetType';

export type TargetListProps = {
  list: Array<{ uid: string; name: string }>;
  onRemove: (uid: string) => void;
  imageRender?: (id: string) => string;
};

export const ListTargetItem = (props: TargetListProps) =>
  props.list.length > 0 ? (
    <List
      grid={{
        gutter: 0,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={props.list}
      renderItem={item => (
        <List.Item>
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            className="livestream-target-item"
            style={{ padding: 5, borderRadius: 5 }}
          >
            {/* <Col span={3}>
              <Avatar
                src={
                  props.type == LivestreamFacebookTargetType.group
                    ? 'https://www.codester.com/static/uploads/items/5415/icon.png'
                    : `http://graph.facebook.com/${item.uid}/picture?type=large`
                }
                size={60}
              />
            </Col> */}
            <Col span={20}>
              <div style={{ padding: 10, flexWrap: 'wrap' }}>{item.name}</div>
            </Col>
            <Col span={1}>
              <Icon
                type="close-circle"
                style={{ color: 'rgb(81, 74, 157)', fontSize: 20, cursor: 'pointer' }}
                onClick={() => props.onRemove(item.uid)}
              />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  ) : (
    <Empty description="" />
  );
