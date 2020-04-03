import { Alert, Card, Col, Icon, Row, Spin, Avatar } from 'antd'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { User } from '../../types'

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
		return (
			<Card title={<BreadCrumb />} style={{ height: 'calc(100vh - 65px)' }}>
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
