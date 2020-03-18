import React from 'react'
import { Row, Col } from 'antd'

export const HomePage = () => (
	<Row style={{ paddingTop: 50 }}>
		<Col span={24}>
			<Row type="flex" justify="center">
				<Col>
					<img
						src={
							'https://tech5s.com.vn/uploads/binhnd/dich-vu-quang-cao-facebook-hieu-qua-11.PNG'
						}
						style={{ maxWidth: 400 }}
					/>
				</Col>
			</Row>
		</Col>
		<Col span={24}>
			<Row type="flex" justify="center">
				<Col>
					<span style={{ fontSize: 30, textAlign: 'center', width: '100%' }}>
						Click drawer to open apps !
					</span>
				</Col>
			</Row>
		</Col>
	</Row>
)
