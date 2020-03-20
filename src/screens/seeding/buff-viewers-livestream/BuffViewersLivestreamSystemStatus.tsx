import React from 'react'
import { Statistic, Card, Row, Col, Icon, Spin } from 'antd'
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
    <Row style={{ marginBottom: 10 }}>
        <Col md={24} xs={24} style={{ marginTop: 10, textAlign: 'center' }}>
            {!loading && (
                <Statistic
                    title="Remaining viewers"
                    value={loading ? 0 : data.buff_viewers_system_status.available_viewers}
                    prefix={<Icon type="eye" />}
                    valueStyle={{ color: 'rgb(64, 169, 255)' }}
                />
            )}
        </Col>
    </Row>
))