import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import { AddSchedule } from './AddSchedule';

export interface BroadcastTimeProps {
  value: number[],
  onChange: (newBroadcastTime: number[]) => void,
  now: boolean
}

export const BroadcastTime = (props: BroadcastTimeProps) => (
  <Row>
    {props.now && (
      <Col span={12}>
        <Row>
          <Col span={24} style={{ cursor: 'pointer' }}>
            <Checkbox style={{ marginRight: 20 }} checked>Live now</Checkbox>
          </Col>
          <AddSchedule tagsSchedule={props.value} onChange={props.onChange} />
        </Row>
      </Col>
    )}
  </Row>
);
