import Alert from 'antd/lib/alert'
import Avatar from 'antd/lib/avatar'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import Table from 'antd/lib/table'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { GraphQLQueryFetcher, GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { ServicePricing, User } from '../../types'

const query = graphql`
	query AdminContactQuery {
		myadmin {
			name
			phone
			username
			email
			facebook_uid
			admin_page_uid
		}
	}
`

const tranfromPricing = (priceValue: number) => {
	const minutes = [30, 60, 90, 120, 150, 180]
	const amounts = [50, 100, 150, 200, 250, 300, 500, 600]
	const raw = amounts.map(amount => ({
		amount
	}))
	raw.map(el => {
		minutes.forEach(minute => {
			el[`${minute}p`] = (priceValue * minute * el.amount).toLocaleString()
		})
		return el
	})
	return raw
}

export const AdminContact = GraphQLWrapper<{ myadmin: User }>(
	query,
	{},
	({ loading, error, data }) => {
		if (error)
			return (
				<Card style={{ height: '100vh - 65px' }} title={<BreadCrumb />}>
					<Row type="flex" justify="space-around">
						<Col xs={24}>
							<Alert showIcon message={error} type="error" />
						</Col>
					</Row>
				</Card>
			)
		if (loading && !error)
			return (
				<Card style={{ height: '100vh - 65px' }} title={<BreadCrumb />}>
					<Row type="flex" justify="space-around">
						<Col>
							<Spin
								indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
							/>
						</Col>
					</Row>
				</Card>
			)

		const [pricing, setPricing] = useState<ServicePricing>()

		useEffect(() => {
			const fn = async () => {
				const { me: { pricing } } = await GraphQLQueryFetcher<{ me: User }>(
					graphql`
						query AdminContactPricingQuery {
							me {
								id
								pricing {
									buff_viewers_livestream
  								vip_viewers_livestream
  								livestream {
										p480
  									p720
  									p1080
									}
								}
							}
						}
					`,
					{}
				)
				setPricing(pricing)
			}
			fn()
		}, [])

		return (
			<Card title={<BreadCrumb />} >
				<Row type="flex" justify="center" align="middle" gutter={16}>
					<Col xs={24} style={{ marginBottom: 20 }}>
						<Text>
							<Alert
								showIcon
								type="info"
								message="Nếu bạn gặp bất cứ vấn đề gì, vui lòng liên hệ với admin bằng những thông tin dưới đây."
							/>
						</Text>
					</Col>
					<Col xs={24}>
						<Table
							title={() => `Giá tăng mắt một lần: ${pricing?.buff_viewers_livestream}đ/mắt/phút`}
							style={{ marginBottom: 20, overflow: 'auto' }}
							tableLayout="auto"
							bordered
							size="small"
							pagination={false}
							dataSource={tranfromPricing(pricing?.buff_viewers_livestream)}
							columns={
								[
									{
										title: ' ',
										dataIndex: 'amount',
										key: 'amount',
									},
									{
										title: '30p',
										dataIndex: '30p',
										key: '30p',
									},
									{
										title: '60p',
										dataIndex: '60p',
										key: '60p',
									},
									{
										title: '90p',
										dataIndex: '90p',
										key: '90p',
									},
								]
							} />
					</Col>
					<Col xs={24} sm={12} style={{ marginBottom: 15 }} md={8}>
						<Card
							hoverable
							style={{
								fontSize: 17,
								borderRadius: 10,
								boxShadow:
									'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
							}}
						>
							<Card.Meta
								avatar={
									<Avatar src="https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png" />
								}
								title={<Text strong>Zalo</Text>}
								description={
									<Text>
										<a href={`tel:${data.myadmin?.phone}`}>
											{data.myadmin?.phone}
										</a>
									</Text>
								}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} style={{ marginBottom: 15 }} md={8}>
						<Card
							hoverable
							style={{
								fontSize: 17,
								borderRadius: 10,
								boxShadow:
									'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
							}}
							bodyStyle={{ wordWrap: 'break-word' }}
						>
							<Card.Meta
								avatar={<Icon type="mail" />}
								title={<Text strong>Email</Text>}
								description={
									<Text>
										<a href={`mailto:${data.myadmin?.email}`}>
											{data.myadmin?.email}
										</a>
									</Text>
								}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} style={{ marginBottom: 15 }} md={8}>
						<Card
							hoverable
							style={{
								fontSize: 17,
								borderRadius: 10,
								boxShadow:
									'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
							}}
						>
							<Card.Meta
								avatar={<Icon type="facebook" />}
								title={<Text strong>Facebook</Text>}
								description={
									<Text>
										<a
											href={`https://facebook.com/${data.myadmin?.facebook_uid}`}
										>
											{data.myadmin?.facebook_uid}
										</a>
									</Text>
								}
							/>
						</Card>
					</Col>
				</Row>
			</Card>
		)
	},
)
