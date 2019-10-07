import React from 'react'
import { LivestreamListAction } from './LivestreamListAction'
import { LivestreamList } from './LivestreamList' 
import { Row, Col, Card } from 'antd'

export const LivestreamPage = () => (
    <Card title="Livestream task manager" bodyStyle={{ padding: 20 }} loading={false}>

        <Row>
            <Col span={24} style={{
                paddingBottom: 20,
                paddingTop: 10
            }}
            >
                <LivestreamListAction />
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <LivestreamList />
            </Col>
        </Row>

    </Card>
)