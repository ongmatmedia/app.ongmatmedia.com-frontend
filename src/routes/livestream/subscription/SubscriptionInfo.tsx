import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { LivestreamSubscription } from '../../../types';

type SubscriptionInfoProps = {
  sub: LivestreamSubscription | null;
  loading: boolean;
};

const Info = (props: { name: string; value: number | string | null; loading: boolean }) => (
  <Card style={{ margin: 10, borderRadius: 60 }} loading={props.loading}>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={12}>
        <span style={{ fontWeight: 'bold' }}>{props.name}</span>
      </Col>
      <Col span={12}>
        <Avatar style={{ backgroundColor: 'rgb(6, 107, 199)', verticalAlign: 'middle' }} size={80}>
          {props.value}
        </Avatar>
      </Col>
    </Row>
  </Card>
);

export const SubscriptionInfo = (props: SubscriptionInfoProps) => (
  <Row>
    <Col xs={24} sm={12} md={8}>
      <Info
        loading={props.loading}
        name="Concurent limit"
        value={props.sub && props.sub.concurrent_limit}
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Info loading={props.loading} name="Max quality" value={props.sub && props.sub.quality} />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Info
        loading={props.loading}
        name="Remain days"
        value={props.sub && Math.floor((props.sub.end_time - Date.now()) / 1000 / 60 / 60 / 24)}
      />
    </Col>
  </Row>
);
