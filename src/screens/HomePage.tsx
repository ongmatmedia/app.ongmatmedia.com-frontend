import { Alert, Card, Col, DatePicker, Icon, List, Row, Statistic } from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { withRouter } from 'react-router-dom'
import { GraphQLQueryFetcher } from '../graphql/GraphQLWrapper'
import { groupTimeIntoDayMap, nFormatter } from '../helpers/utils'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import Moment from 'react-moment'

const { RangePicker } = DatePicker;

const query = graphql`
	query HomePageQuery {
		payment_histories {
    	edges {
    	  node {
    	    id
    	    service
    	    total
    	    time
					balance_after
    	  }
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
	elements: {
		line: {
			fill: false,
		},
	},
	legend: {
		display: true,
		position: 'bottom',
		labels: {
			fontColor: "#000080",
		}
	},
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: false,
				},
				ticks: {
					callback: (value: string, index: number, values: number[]) => {
						const date = new Date(value)
						return date.getDate() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear()
					},
				},
			},
		],
		yAxes: [
			{
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				gridLines: {
					display: true,
				},
				labels: {
					show: true,
				},
				ticks: {
					callback: (value: number) => {
						return nFormatter(value, 1)
					},
				},
				scaleLabel: {
					display: true,
					labelString: 'Send/Receive'
				}
			},
			{
				type: 'linear',
				display: true,
				position: 'right',
				id: 'y-axis-2',
				gridLines: {
					display: true,
				},
				labels: {
					show: true,
				},
				ticks: {
					callback: (value: number) => {
						return nFormatter(value, 1)
					},
				},
				scaleLabel: {
					display: true,
					labelString: 'Total'
				}
			},
		],
	},
}

const seedingAnnoucements = [
	{
		type: 'info',
		message:
			'Hệ thống đang trong quá trình thử nghiệm. Nếu bạn gặp bất kì vấn đề gì vui lòng liên hệ admin.',
	},
]

export const HomePage = withRouter(props => {

	const [paymentHistories, setPaymentHistories] = useState<
		{
			time: string,
			send_money: number,
			receive_money: number,
			balance_after: number,
			total: number,
			buff_viewers_livestream_money: number
		}[]
	>([])

	const [rangeDatePicker, setRangeDatePicker] = useState<number[]>([])

	useEffect(() => {
		const fn = async () => {
			const data = await GraphQLQueryFetcher<{ payment_histories: { edges: Array<{ node: { id: string, total: number, time: number, balance_after: number, service: string } }> } }>(query, {})
			const groupedByDayData = groupTimeIntoDayMap(data.payment_histories.edges.map(e => e.node))
			const groupedByMoneyFieldData = groupedByDayData.map(paymentEachDay => ({
				time: paymentEachDay.time,
				send_money: Math.abs(paymentEachDay.data.reduce((sum, cur) => cur.total < 0 ? sum + cur.total : sum, 0)),
				receive_money: Math.abs(paymentEachDay.data.reduce((sum, cur) => cur.total > 0 ? sum + cur.total : sum, 0)),
				balance_after: Math.abs(paymentEachDay.data[paymentEachDay.data.length - 1].balance_after),
				buff_viewers_livestream_money: Math.abs(paymentEachDay.data.reduce((sum, cur) => cur.service == 'BUFF_VIEWERS_LIVESTREAM' ? sum + cur.total : sum, 0))
			}))
			const sortedAscendingDayData = groupedByMoneyFieldData.map(data => ({
				...data,
				total: 0 - (data.receive_money + data.send_money)
			})).sort((a, b) => {
				if (a['time'] < b['time']) {
					return -1
				}
				if (a['time'] > b['time']) {
					return 1
				}
				return 0
			})
			setPaymentHistories(rangeDatePicker.length > 0 && rangeDatePicker.every(date => !!date)
				? sortedAscendingDayData.filter(data => rangeDatePicker[0] <= new Date(data.time).getTime() && new Date(data.time).getTime() <= rangeDatePicker[1])
				: sortedAscendingDayData)
		}
		fn()
	}, [rangeDatePicker])

	return (
		<Card>
			<Row gutter={16}>
				<Col sm={12} xs={24}>
					<List
						size="small"
						header={null}
						footer={null}
						dataSource={seedingAnnoucements}
						renderItem={item => (
							<Alert
								style={{ marginBottom: 20 }}
								showIcon
								type={item.type as 'success' | 'info' | 'warning' | 'error'}
								message={item.message}
							/>
						)}
					/>
				</Col>
				<Col sm={12} xs={24}>
					<Row gutter={16}>
						<Col sm={12} xs={24}>
							<Card>
								<Statistic
									title={<Text strong>{'Balance'.toLocaleUpperCase()}</Text>}
									value={Number(paymentHistories[paymentHistories.length - 1]?.balance_after).toLocaleString()}
									prefix={<Icon type="dollar" />}
									valueStyle={{ color: '#856c8b' }}
								/>
							</Card>
						</Col>
						<Col sm={12} xs={24}>
							<Card>
								<Statistic
									valueStyle={{ color: '#ff1e56' }}
									title={<Text strong>{'Send money'.toLocaleUpperCase()}</Text>}
									value={Number(paymentHistories?.reduce((sendMoney, curr) => sendMoney + curr.send_money, 0)).toLocaleString()}
									prefix={<Icon type="rise" />}
								/>
							</Card>
						</Col>
						<Col sm={12} xs={24} style={{ marginTop: 10 }}>
							<Card>
								<Statistic
									valueStyle={{ color: '#ffa41b' }}
									title={
										<Text strong>{'Receive money'.toLocaleUpperCase()}</Text>
									}
									value={Number(paymentHistories?.reduce((sendMoney, curr) => sendMoney + curr.receive_money, 0)).toLocaleString()}
									prefix={<Icon type="thunderbolt" theme="filled" />}
								/>
							</Card>
						</Col>
						<Col sm={12} xs={24} style={{ marginTop: 10 }}>
							<Card>
								<Statistic
									valueStyle={{ color: '#00bdaa' }}
									title={<Text strong>{'Total'.toLocaleUpperCase()}</Text>}
									value={Number(paymentHistories?.reduce((sendMoney, curr) => sendMoney + curr.total, 0)).toLocaleString()}
									prefix={<Icon type="money-collect" />}
								/>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row type="flex" align="middle" style={{ textAlign: 'center' }}>
				<Col lg={12} xs={24}>
					<RangePicker onChange={(dates, dateStrings) => setRangeDatePicker(dateStrings.map(date => new Date(date).getTime()))} format="MM/DD/YYYY"
					/>
					<Bar data={
						{
							labels: [...paymentHistories.map(paymentHistory => paymentHistory.time)],
							datasets: [
								{
									yAxisID: 'y-axis-1',
									type: 'line',
									label: 'Send money',
									fill: false,
									lineTension: 0.1,
									backgroundColor: '#ff1e56',
									borderColor: '#ff1e56',
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: '#ff1e56',
									pointBackgroundColor: '#fff',
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: '#ff1e56',
									pointHoverBorderColor: '#ff1e56',
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [...paymentHistories.map(paymentHistory => paymentHistory.send_money)],
								},
								{
									yAxisID: 'y-axis-1',
									type: 'line',
									label: 'Receive money',
									fill: false,
									lineTension: 0.1,
									backgroundColor: '#ffa41b',
									borderColor: '#ffa41b',
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: '#ffa41b',
									pointBackgroundColor: '#fff',
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: '#ffa41b',
									pointHoverBorderColor: '#ffa41b',
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [...paymentHistories.map(paymentHistory => paymentHistory.receive_money)],
								},
								{
									yAxisID: 'y-axis-2',
									type: 'bar',
									label: 'Total money',
									fill: false,
									lineTension: 0.1,
									backgroundColor: '#00bdaa',
									borderColor: '#00bdaa',
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: '#00bdaa',
									pointBackgroundColor: '#fff',
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: '#00bdaa',
									pointHoverBorderColor: '#00bdaa',
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [...paymentHistories.map(paymentHistory => paymentHistory.total)],
								},
							],
						}
					} options={options} />
					<div style={{ marginTop: 17 }}>
						<Text strong>{'Biểu đồ tổng thu chi 7 ngày có giao dịch gần nhất'}</Text>
					</div>
				</Col>
				<Col lg={12} xs={24}>
					<Pie
						options={{
							legend: {
								display: true,
								position: 'bottom',
								labels: {
									fontColor: "#000080",
								}
							},
						}}
						data={{
							labels: ['Mắt', 'Đại lý'],
							datasets: [
								{
									data: [paymentHistories.reduce((sum, payment) => sum + payment.buff_viewers_livestream_money, 0), paymentHistories.reduce((sum, payment) => sum + payment.send_money, 0)],
									backgroundColor: ['#36A2EB', '#ffb385'],
									hoverBackgroundColor: ['#36A2EB', '#ffb385'],
								},
							],
						}} />
					<div style={{ marginTop: 17 }}>
						<Text strong>{'Biểu đồ phân chia tiền đại lý'}</Text>
					</div>
				</Col>
			</Row>
		</Card>
	)
})
