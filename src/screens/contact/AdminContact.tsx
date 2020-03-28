import React from 'react'
import { Card, Row, Col, Avatar, Icon, Alert } from 'antd'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import Text from 'antd/lib/typography/Text'

const seedingAdminInformation = {
	uid: '100005137867313',
	name: 'Dang Tien Nguyen',
	tel: '0988785856',
	location: 'Hanoi',
	facebook: 'fb.com/duongvanba',
}

export const AdminContact = () => {
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
						width: 240,
						fontSize: 17,
						borderRadius: 10,
						boxShadow:
							'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
					}}
					cover={
						<img
							alt="example"
							src={`http://graph.facebook.com/${seedingAdminInformation.uid}/picture?type=large`}
						/>
					}
				>
					<Card.Meta
						title={seedingAdminInformation.name}
						description={
							<>
								<div>
									<Icon
										type="phone"
										theme="filled"
										style={{ paddingRight: 10 }}
									/>
									<Text>
										<a href={`tel:${seedingAdminInformation.tel}`}>
											{seedingAdminInformation.tel}
										</a>
									</Text>
								</div>
								<div>
									<Icon
										type="home"
										theme="filled"
										style={{ paddingRight: 10 }}
									/>
									<Text>{seedingAdminInformation.location}</Text>
								</div>
								<div>
									<Icon
										type="facebook"
										theme="filled"
										style={{ paddingRight: 10 }}
									/>
									<Text>
										<a href={`fb.com/${seedingAdminInformation.uid}`}>
											{seedingAdminInformation.facebook}
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
}
