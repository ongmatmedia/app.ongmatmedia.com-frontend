import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Statistic from 'antd/lib/statistic'
import Text from 'antd/lib/typography/Text'
import Icon from 'antd/lib/icon'
import './style.css'

export const LivestreamStatistics = (props: {
	total: number
	playing: number
}) => (
	<>
		<Row gutter={16} style={{ marginBottom: 10 }}>
			<Col md={6} xs={24} style={{ marginTop: 10 }}>
				<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
					<Statistic
						style={{ textAlign: 'center' }}
						title={<Text style={{ fontSize: 20 }}>Total</Text>}
						value={props.total}
						valueStyle={{ color: 'rgb(64, 169, 255)' }}
					/>
				</Card>
			</Col>
			<Col md={6} xs={24} style={{ marginTop: 10 }}>
				<Card style={{ border: '2px solid rgb(64, 169, 255)' }}>
					<Statistic
						style={{ textAlign: 'center' }}
						title={<Text style={{ fontSize: 20 }}>Playing</Text>}
						value={props.playing}
						prefix={
							<Icon
								type="video-camera"
								style={{
									color: '#ff5722',
								}}
								className={!!props.playing ? 'flash' : ''}
							/>
						}
						valueStyle={{ color: 'rgb(64, 169, 255)' }}
					/>
				</Card>
			</Col>
		</Row>
	</>
)
