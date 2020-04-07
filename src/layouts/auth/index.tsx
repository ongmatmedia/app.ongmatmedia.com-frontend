import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'
import './auth-layout.css'

const Icon = () => (
	<Row
		type="flex"
		justify="space-around"
		align="middle"
		style={{ height: '100%', flexDirection: 'column' }}
	>
		<Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
			<img
				src="https://i.pinimg.com/originals/58/f4/72/58f4723d8f23906bdcb058604075ad2a.png"
				style={{ maxWidth: '90%', alignItems: 'center' }}
			/>
		</Col>
	</Row>
)

export const AuthLayout = (props: { Content}) => (
	<div
		style={{
			display: 'flex',
			background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
			flexDirection: 'column',
			minHeight: '100vh',
			justifyContent: 'center',
		}}
	>
		<Row type="flex" justify="center">
			<Col
				md={12}
				xs={20}
				xxl={9}
				style={{
					backgroundColor: 'white',
					borderRadius: 30,
					minHeight: 400,
				}}
			>
				<Row type="flex" style={{ padding: 30 }}>
					<Col md={12} xs={0}>
						<Icon />
					</Col>

					<Col md={12} xs={24}>
						<props.Content {...props} />
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
)
