import React, { useState } from 'react'
import { AccountList } from './AccountList'
import { Card, Row, Col } from 'antd'
import { AccountActions } from './AccountActions'

export const AccountPage = () => {

    const loading = true


    return (
        <Card title="Account manager" bodyStyle={{ padding: 20 }} loading={false}>

            <Row>
                <Col span={24} style={{
                    paddingBottom: 20,
                    paddingTop: 10
                }}
                >
                    <AccountActions />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <AccountList />
                </Col>
            </Row>

        </Card>

    )
}