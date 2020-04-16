import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Skeleton from 'antd/lib/skeleton'
import Statistic from 'antd/lib/statistic'
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
		percentage: number
		totalIncreaseViewers: number
		totalAvailableAmount: number
	}
>(
	query,
	{},
	({
		data,
		loading,
		buffStatusData,
		percentage,
		totalAvailableAmount,
		totalIncreaseViewers,
	}) => {
		if (loading) return <Skeleton active />
		else if (!loading && data)
			return (
				<Row gutter={16} style={{ marginBottom: 10 }}>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
							<Statistic
								style={{ textAlign: 'center' }}
								title={<Text style={{ fontSize: 20 }}>Available</Text>}
								value={data.buff_viewers_system_status.available_viewers}
								prefix={<Icon type="eye" className="pulse" />}
								valueStyle={{ color: 'rgb(64, 169, 255)' }}
							/>
						</Card>
					</Col>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
							<Statistic
								style={{ textAlign: 'center' }}
								title={<Text style={{ fontSize: 20 }}> Percentage</Text>}
								value={percentage || '_'}
								suffix={!!percentage && <Icon type="percentage" />}
								valueStyle={{ color: 'green' }}
							/>
						</Card>
					</Col>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
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
										className={
											buffStatusData.filter(status => status == 'playing')
												.length > 0
												? 'flash'
												: ''
										}
									/>
								}
								valueStyle={{ color: 'green' }}
							/>
						</Card>
					</Col>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
							<Statistic
								style={{ textAlign: 'center' }}
								title={<Text style={{ fontSize: 20 }}> Increased</Text>}
								value={totalIncreaseViewers || '_'}
								prefix={<Icon type="rise" theme="filled" />}
								valueStyle={{ color: 'orange' }}
							/>
						</Card>
					</Col>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
							<Statistic
								style={{ textAlign: 'center' }}
								title={<Text style={{ fontSize: 20 }}>Ordered</Text>}
								value={totalAvailableAmount || '_'}
								prefix={<Icon type="stock" theme="filled" />}
								valueStyle={{ color: 'brown' }}
							/>
						</Card>
					</Col>
					<Col lg={4} md={8} sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
							<Statistic
								style={{ textAlign: 'center' }}
								title={<Text style={{ fontSize: 20 }}> Failure</Text>}
								value={
									buffStatusData.filter(
										status => status == 'overload' || status == 'fail',
									).length
								}
								prefix={<Icon type="warning" theme="filled" />}
								valueStyle={{ color: '#dd2c00' }}
							/>
						</Card>
					</Col>
				</Row>
			)
	},
)
