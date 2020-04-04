import { Card, Col, Icon, Row, Skeleton, Statistic } from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React from 'react'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'
import { BuffViewersLivestreamStatus } from '../../../types'
import './style.css'

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
	{
		buffStatusData: string[]
	}
>(query, {}, ({ data, loading, buffStatusData }) => {
	if (loading) return <Skeleton active />
	else if (!loading && data)
		return (
			<Row gutter={16} style={{ marginBottom: 10 }}>
				<Col md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
					<Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
						<Statistic
							style={{ textAlign: 'center' }}
							title={<Text style={{ fontSize: 20 }}>Available</Text>}
							value={data.buff_viewers_system_status.available_viewers}
							prefix={<Icon type="eye" className="pulse" />}
							valueStyle={{ color: 'rgb(64, 169, 255)' }}
						/>
					</Card>
				</Col>
				<Col md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
					<Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
						<Statistic
							style={{ textAlign: 'center' }}
							title={<Text style={{ fontSize: 20 }}> Percentage</Text>}
							value={30}
							suffix={<Icon type="percentage" />}
							valueStyle={{ color: 'green' }}
						/>
					</Card>
				</Col>
				<Col md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
					<Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
						<Statistic
							style={{ textAlign: 'center' }}
							title={<Text style={{ fontSize: 20 }}> Playing</Text>}
							value={
								buffStatusData.filter(status => status == 'playing').length
							}
							prefix={
								<Icon
									type="video-camera"
									style={{
										color: '#ff5722',
									}}
									className="flash"
								/>
							}
							valueStyle={{ color: 'green' }}
						/>
					</Card>
				</Col>
				<Col md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
					<Card style={{ border: '4px solid rgb(64, 169, 255)' }}>
						<Statistic
							style={{ textAlign: 'center' }}
							title={<Text style={{ fontSize: 20 }}> Fail</Text>}
							value={buffStatusData.filter(status => status == 'done').length}
							prefix={<Icon type="warning" theme="filled" />}
							valueStyle={{ color: '#dd2c00' }}
						/>
					</Card>
				</Col>
			</Row>
		)
})
