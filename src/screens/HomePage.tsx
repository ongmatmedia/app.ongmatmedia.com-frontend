import React from 'react'
import { Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'

export const HomePage = withRouter(props => (
	<Row style={{ paddingTop: 50 }}>
		<Col span={24}>
			<Row type="flex" justify="center">
				<Col style={{cursor: 'pointer'}} onClick={() => props.history.push('/seeding/buff-viewers-livestream')}>
					<img
						src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcS7_i3JXOC7xJry5OeDtq2AXXJfE4yJQ4awy8urSRuj91xZQe'}
						style={{ maxWidth: 400 }}
					/>
				</Col>
			</Row>
		</Col>
		<Col span={24}>
			<Row type="flex" justify="center" style={{textAlign: 'center'}}>
				<Col>
					<span style={{ fontSize: 30, textAlign: 'center', width: '100%' }}>
						Bấm vào ảnh để tăng mắt
					</span>
				</Col>
			</Row>
		</Col>
	</Row>
))
