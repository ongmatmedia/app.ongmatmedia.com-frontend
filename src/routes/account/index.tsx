import React, { useState } from 'react'
import { AccountList } from './account.list'
import { Card, Row, Col } from 'antd'
import { AccountAction } from './account.action'

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
                    <AccountAction />
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