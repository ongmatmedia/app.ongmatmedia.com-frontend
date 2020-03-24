import React from 'react'
import { Card, Row, Col, Spin, Icon } from 'antd'
import { BreadCrumb } from './BreadCrumb'

export const LoadingIndicatorWithBreadcrumb = () => (
  <Card title={<BreadCrumb />} style={{ height: '100vh' }}>
    <Row type="flex" justify="space-around">
      <Col>
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
          spinning={true}
        />
      </Col>
    </Row>
  </Card>
)