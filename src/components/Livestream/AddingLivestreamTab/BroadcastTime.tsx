import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import { AddSchedule } from './AddSchedule';

export const BroadcastTime = ((props: { value: number; onChange: Function; now: boolean }) => {

  return (
    <Row>
      {props.now && (
        <Col span={12}>
          <Row>
            <Col span={24} style={{ cursor: 'pointer' }} onClick={() => props.onChange(0)}>
              <Checkbox style={{ marginRight: 20 }} checked>Live now</Checkbox>
            </Col>
            <AddSchedule tagsSchedule={[123456789]} onChange={(listTimeSchedule) => console.log(listTimeSchedule)} />
          </Row>
        </Col>
      )}
    </Row>
  );
}) as any;
