import React from 'react'
import { Card, Col, Row } from 'antd'
import { AgencyAction } from './AgencyAction'
import { AgencyList } from './AgencyList'

export const AgencyPage = () => (
    <Card title="Agency manager" bodyStyle={{ padding: 20 }}  >
        <Row>
            <Col span={24} style={{
                paddingBottom: 20,
                paddingTop: 10
            }}
            >
                <AgencyAction />
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <AgencyList />
            </Col>
        </Row>
    </Card>
)