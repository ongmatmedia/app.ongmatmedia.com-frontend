import React from 'react'
import { Card, Row, Col, Avatar, Icon, Alert, Spin } from 'antd'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { User } from '../../types'

const seedingAdminInformation = {
	uid: '100005137867313',
	name: 'Dang Tien Nguyen',
	tel: '0988785856',
	location: 'Hanoi',
	facebook: 'fb.com/duongvanba',
}

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
				<Row type="flex" justify="center" align="middle">
					<Col xs={24} style={{ marginBottom: 20 }}>
						<Text>
							<Alert
								showIcon
								type="info"
								message="Nếu bạn gặp bất cứ vấn đề gì, vui lòng liên hệ với admin bằng những thông tin dưới đây."
							/>
						</Text>
					</Col>
					<Card
						hoverable
						style={{
							fontSize: 17,
							borderRadius: 10,
							boxShadow:
								'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
						}}
						cover={
							<img
								alt="example"
								src={`http://graph.facebook.com/${data.myadmin?.facebook_uid}/picture?type=large`}
							/>
						}
					>
						<Card.Meta
							title={name}
							description={
								<>
									<div>
										<Icon
											type="phone"
											theme="filled"
											style={{ paddingRight: 10 }}
										/>
										<Text>
											<a href={`tel:${data.myadmin?.phone}`}>
												{data.myadmin?.phone}
											</a>
										</Text>
									</div>
									<div>
										<Icon
											type="mail"
											theme="filled"
											style={{ paddingRight: 10 }}
										/>
										<Text>
											<a href={`mailto:${data.myadmin?.email}`}>
												{data.myadmin?.email}
											</a>
										</Text>
									</div>
									<div>
										<Icon
											type="facebook"
											theme="filled"
											style={{ paddingRight: 10 }}
										/>
										<Text>
											<a href={`https://fb.com/${data.myadmin?.facebook_uid}`}>
												{data.myadmin?.facebook_uid}
											</a>
										</Text>
									</div>
								</>
							}
						/>
					</Card>
				</Row>
			</Card>
		)
	},
)
