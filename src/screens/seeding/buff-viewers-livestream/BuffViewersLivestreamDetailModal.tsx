import { Alert, Col, Descriptions, Icon, Modal, Row, Spin, Statistic, Divider } from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { SmartGrahQLQueryRenderer } from '../../../graphql/GraphQLWrapper'
import { BuffViewersLivestream } from '../../../types'
import { useAuth0 } from '../../../context/Auth0'

const query = graphql`
	query BuffViewersLivestreamDetailModalQuery($id: String!) {
		buff_viewers_livestream_task(id: $id) {
			id
			logs {
				amount
				time
			}
			orders {
				from
				time
				amount
				limit_mins
			}
		}
	}
`

const options = {
	responsive: true,
	tooltips: {
		mode: 'label',
		callbacks: {
			label: function (tooltipItem, data) {
				let label = data.datasets[tooltipItem.datasetIndex].label || ''
				if (label) {
					label += ': '
				}
				label += Number(tooltipItem.yLabel).toLocaleString()
				return label
			},
		},
	},
	legend: {
		display: true,
		position: 'bottom',
		labels: {
			fontColor: '#000080',
		},
	},
	scales: {
		xAxes: [
			{
				display: true,
				ticks: {
					callback: (value: string, index: number, values: string[]) => {
						const date = new Date(value)
						return date.getMinutes() % 15 == 0 &&
							new Date(values[index + 1]).getMinutes() !== 15
							? date.toLocaleTimeString('vi-VN')
							: ''
					},
				},
				scaleLabel: {
					display: true,
					labelString: 'Time',
				},
			},
		],
		yAxes: [
			{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Viewers',
				},
			},
		],
	},
}

export const BuffViewersDetailModal = (props: {
	onClose: Function
	video_id: string
}) => {
	const { user } = useAuth0()
	return (
		<Modal
			width="80%"
			destroyOnClose
			closable={true}
			title="Buff viewers for livestream"
			style={{ textAlign: 'center', top: 10 }}
			onCancel={() => props.onClose()}
			footer={null}
			visible={true}
		>
			<SmartGrahQLQueryRenderer<{
				buff_viewers_livestream_task: BuffViewersLivestream
			}>
				query={query}
				variables={{ id: props.video_id }}
				render={({ data, loading, error }) => (
					<Row>
						<Col xs={24}>
							{error && <Alert showIcon message={error} type="error" />}
							{loading && !error && (
								<Spin
									indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
								/>
							)}
							{!loading && data && (
								<>
									<Row gutter={16} style={{marginBottom: 15}}>
										<Col xs={24} sm={8}>
											<Statistic title="ID" value={data.buff_viewers_livestream_task.id} formatter={value => value} />
										</Col>
										<Col xs={24} sm={8}>
											<Statistic title="Original viewers" value={data.buff_viewers_livestream_task
												.logs[0].amount}  />
										</Col>
										<Col xs={24} sm={8}>
											<Statistic title="Last reported viewers" value={data.buff_viewers_livestream_task
												.logs[data.buff_viewers_livestream_task
													.logs.length - 1].amount} />
										</Col>
									</Row>
									<Divider />
									<Descriptions bordered layout="vertical" title={"Chi tiết order"} size="small" style={{ marginBottom: 15 }}>
										<Descriptions.Item label="Time">
											{new Date(data.buff_viewers_livestream_task.orders?.filter(el => el.from == user.sub)[0].time).toLocaleString('vi-VN', {
												hour12: true
											})}
										</Descriptions.Item>
										<Descriptions.Item label="Amount">
											{data.buff_viewers_livestream_task.orders?.filter(el => el.from == user.sub)[0].amount}
										</Descriptions.Item>
										<Descriptions.Item label="Limit mins">
											{data.buff_viewers_livestream_task.orders?.filter(el => el.from == user.sub)[0].limit_mins}
										</Descriptions.Item>
									</Descriptions>
									<Line
										data={{
											labels: data.buff_viewers_livestream_task.logs.map(el =>
												new Date(el.time).toLocaleString(),
											),
											datasets: [
												{
													label: 'Real-time viewers',
													fill: false,
													lineTension: 0.1,
													backgroundColor: 'rgba(75,192,192,0.4)',
													borderColor: 'rgba(75,192,192,1)',
													borderCapStyle: 'butt',
													borderDash: [],
													borderDashOffset: 0.0,
													borderJoinStyle: 'miter',
													pointBorderColor: 'rgba(75,192,192,1)',
													pointBackgroundColor: '#fff',
													pointBorderWidth: 1,
													pointHoverRadius: 5,
													pointHoverBackgroundColor: 'rgba(75,192,192,1)',
													pointHoverBorderColor: 'rgba(220,220,220,1)',
													pointHoverBorderWidth: 2,
													pointRadius: 1,
													pointHitRadius: 10,
													data: data.buff_viewers_livestream_task.logs.map(
														el => el.amount,
													),
												},
											],
										}}
										options={options}
									/>
								</>
							)}
						</Col>
					</Row>
				)}
			/>
		</Modal>
	)
}
