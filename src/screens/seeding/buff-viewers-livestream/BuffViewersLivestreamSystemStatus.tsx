import React from 'react'
import { Statistic, Card, Row, Col, Icon } from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { BuffViewersLivestreamStatus } from '../../../types'

const query = graphql`
    query BuffViewersLivestreamSystemStatusQuery{
        buff_viewers_system_status{
            available_viewers
            total_viewers
        }
    }
`

export const BuffViewersLivestreamSystemStatus = GraphQLWrapper<{
    buff_viewers_system_status: BuffViewersLivestreamStatus
}, {}>(query, {}, ({ data, loading }) => (
    <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col md={4} xs={12} style={{ marginTop: 10 }}>
            <Card loading={loading}>
                <Statistic
                    title="Available viewers"
                    value={loading ? 0 : data.buff_viewers_system_status.available_viewers}
                    prefix={<Icon type="eye" />}
                    valueStyle={{ color: 'rgb(64, 169, 255)' }}
                />
            </Card>
        </Col>
    </Row>
))