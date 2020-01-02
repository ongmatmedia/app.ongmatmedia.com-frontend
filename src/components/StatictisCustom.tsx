import React from 'react';
import { Row, Col, Icon } from 'antd';

export interface StatictisCustomProps {
  backgroundColor?: string;
  gradient?: string;
  iconName: string;
  title: string;
  description: string;
  active?: boolean;
}

export const StatictisCustom = (props: StatictisCustomProps) => (
  <Row
    style={{
      borderRadius: 25,
      padding: 10,
      marginRight: 5,
      marginBottom: 10,
      color: 'white',
      ...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}),
      ...(props.gradient ? { background: props.gradient } : {}),
      ...(props.active ? { border: '1px #000102 solid' } : {}),
    }}
    type="flex"
    align="middle"
  >
    <Col xs={8} style={{ textAlign: 'center', width: 70 }}>
      <Icon type={props.iconName} style={{ fontSize: 35 }} />
    </Col>
    <Col xs={16}>
      <Row>
        <div style={{ fontSize: 25 }}>{props.title}</div>
        <div style={{ fontSize: 15 }}>{props.description}</div>
      </Row>
    </Col>
  </Row>
);
