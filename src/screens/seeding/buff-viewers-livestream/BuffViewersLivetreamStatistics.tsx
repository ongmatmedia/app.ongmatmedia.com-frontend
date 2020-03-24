import { Avatar, Card, Col, Icon, Row, Skeleton, Statistic } from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React from 'react'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { BuffViewersLivestreamStatus } from '../../../types'

const query = graphql`
	query BuffViewersLivetreamStatisticsQuery {
		buff_viewers_system_status {
			available_viewers
			total_viewers
		}
	}
`

export const BuffViewersLivetreamStatistics = GraphQLWrapper<
  {
    buff_viewers_system_status: BuffViewersLivestreamStatus
  },
  {}
>(query, {}, ({ data, loading }) => {

  if (loading) return <Skeleton active />
  else if (!loading && data) return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col md={4} xs={12} style={{ marginTop: 10 }}>
        <Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
          <Statistic
            style={{ textAlign: 'center' }}
            title={<Text style={{ fontSize: 20 }}>Remain</Text>}
            value={data.buff_viewers_system_status.available_viewers}
            prefix={<Icon type="eye" />}
            valueStyle={{ color: 'rgb(64, 169, 255)' }}
          />
        </Card>
      </Col>
      <Col md={4} xs={12} style={{ marginTop: 10 }}>
        <Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
          <Statistic
            style={{ textAlign: 'center' }}
            title={<Text style={{ fontSize: 20 }}> Playing</Text>}
            value={2000}
            prefix={
              <Avatar
                src="https://www.tvcnews.tv/wp-content/uploads/2017/07/live.gif"
              />}
            valueStyle={{ color: 'red' }}
          />
        </Card>
      </Col>
    </Row>
  )
})
