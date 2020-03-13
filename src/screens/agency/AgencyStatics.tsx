import React from 'react'
import { Statistic, Card, Row, Col, Icon } from 'antd'
import { User } from '../../types.d'

export type AgencyStaticsProps = {
    users: User[]
}
export const AgencyStatics = (props: AgencyStaticsProps) => (
    <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col md={3}>
            <Card>
                <Statistic
                    title="Total user"
                    value={props.users.length}
                    prefix={<Icon type="user" />}
                    valueStyle={{ color: 'rgb(64, 169, 255)' }}
                />
            </Card>
        </Col>
        <Col md={3}>
            <Card>
                <Statistic
                    valueStyle={{ color: 'rgb(64, 169, 255)' }}
                    title="Remain money"
                    value={(Math.round(props.users.reduce((p, c) => p + c.balance / c.price_percent * 100, 0))).toLocaleString()}
                    prefix={<Icon type="dollar" />}
                />
            </Card>
        </Col>
    </Row>
)