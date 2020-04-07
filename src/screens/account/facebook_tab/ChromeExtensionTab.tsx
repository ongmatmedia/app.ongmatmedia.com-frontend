import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'

export const ChromeExtensionTab = () => (
	<>
		<Row gutter={16}>
			<Col xs={4}>
				<Avatar
					style={{ width: '100%', height: 'auto' }}
					size={64}
					shape="square"
					src="https://lh3.googleusercontent.com/_6Y4tjYdppsZJlWOnAzFy2A8JjGwJpQOvoKocTYMfl66bTJg20mJ6pojdQaUGtvXa9HYurDChQ=w128-h128-e365"
				/>
			</Col>
			<Col xs={12}>
				<span>
					Lighthouse is an open-source, automated tool for improving the
					performance, quality, and correctness of your web apps.
				</span>
			</Col>
			<Col xs={8}>
				<Button style={{ marginTop: 15 }} type="primary" disabled>
					Installed
				</Button>
			</Col>
		</Row>
	</>
)
