import React from 'react';
import { UserInfo } from '../containers/UserInfo';
import { Spin, Card, Row, Col } from 'antd';

export const UserProfile = (
  <Row>
    <Col>
      <span style={{ fontWeight: 'bold' }}>duongvanba</span>{' '}
    </Col>
    <Col>{(124234234).toLocaleString(undefined, { maximumFractionDigits: 2 })}$</Col>
  </Row>
);
