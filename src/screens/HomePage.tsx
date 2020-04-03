/* eslint-disable @typescript-eslint/camelcase */
import { Alert, Card, Col, Icon, List, Row, Spin, Statistic } from 'antd'
import Text from 'antd/lib/typography/Text'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import {
	PaginationWrapper,
	GraphQLQueryFetcher,
} from '../graphql/GraphQLWrapper'
import { groupTimeIntoDayMap, nFormatter } from '../helpers/utils'
import { PaymentHistoryConnection, User } from '../types'
import history from '../helpers/history'

const query = graphql`
	query HomePageQuery($after: String, $first: Int, $before_time: Long) {
		...HomePage_payment_histories
			@arguments(after: $after, first: $first, before_time: $before_time)
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
			fontColor: '#000080',
		},
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
						return (
							date.getDate() +
							'/' +
							(date.getMonth() + 1).toString() +
							'/' +
							date.getFullYear()
						)
					},
				},
			},
		],
		yAxes: [
			{
				type: 'linear',
				display: true,

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
					labelString: 'Send/Receive',
				},
			},
			{
				type: 'linear',
				display: true,

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
					labelString: 'Total',
				},
			},
		],
	},
}

const seedingAnnoucements = [
	{
		type: 'info',
		message: (
			<span>
				Hệ thống đang trong quá trình thử nghiệm. Nếu bạn gặp bất kì vấn đề gì
				vui lòng liên hệ admin.{' '}
				<span
					style={{ textDecoration: 'underline' }}
					onClick={() => history.push('/contact')}
				>
					Click để biết thông tin chi tiết.
				</span>
			</span>
		),
	},
]

export const HomePage = PaginationWrapper<{
	payment_histories: PaymentHistoryConnection
}>(
	query,
	graphql`
		fragment HomePage_payment_histories on Query
			@argumentDefinitions(
				after: { type: "String" }
				first: { type: "Int" }
				before_time: { type: "Long" }
			) {
			payment_histories(
				first: $first
				after: $after
				before_time: $before_time
			) @connection(key: "HomePage_payment_histories") {
				edges {
					node {
						id
						time
						total
						sender_username
						sender_id
						receiver_username
						service
						receiver_id
						balance_after
						note
					}
				}
			}
		}
	`,
	{
		firts: 50,
	},
	({ data, loading, error, reload, load_more, loading_more, has_more }) => {
		if (error || loading)
			return (
				<Card style={{ height: '100vh - 65px' }} size="small">
					<Row type="flex" justify="space-around" style={{ height: '100%' }}>
						<Col>
							{error && <Alert showIcon message={error} type="error" />}
							{!error && loading && (
								<Spin
									indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
								/>
							)}
						</Col>
					</Row>
				</Card>
			)

		useEffect(() => {
			const createUserIfNotExist = async () => {
				try {
					console.log('call query')
					const user = await GraphQLQueryFetcher<{ me: User }>(
						graphql`
							query HomePageCreateUserIfNotExistQuery {
								me {
									id
									username
									balance
									price_percent
									creator_id
								}
							}
						`,
						{},
					)
					return user
				} catch (error) {
					console.error(error)
				}
			}
			createUserIfNotExist()
		}, [])

		useEffect(() => {
			const fn = async () => {
				const last =
					data.payment_histories.edges[data.payment_histories.edges.length - 1]
				if (!last) return
				const has_more_and_last_is_valid =
					has_more() &&
					last.node.time >
						new Date(`00:00:00 ${new Date().toLocaleDateString()}`).getTime()
				if (has_more_and_last_is_valid) await load_more(50)
			}
			fn()
		}, [data?.payment_histories.edges.length])

		const groupedByDayData = groupTimeIntoDayMap(
			data.payment_histories.edges.map(e => e.node),
		)
		const groupedByMoneyFieldData = groupedByDayData.map(paymentEachDay => ({
			time: paymentEachDay.time,
			send_money: Math.abs(
				paymentEachDay.data.reduce(
					(sum, cur) => (cur.total < 0 ? sum + cur.total : sum),
					0,
				),
			),
			receive_money: Math.abs(
				paymentEachDay.data.reduce(
					(sum, cur) => (cur.total > 0 ? sum + cur.total : sum),
					0,
				),
			),
			balance_after: Math.abs(
				paymentEachDay.data[paymentEachDay.data.length - 1].balance_after,
			),
			buff_viewers_livestream_money: Math.abs(
				paymentEachDay.data.reduce(
					(sum, cur) =>
						cur.service == 'BUFF_VIEWERS_LIVESTREAM' ? sum + cur.total : sum,
					0,
				),
			),
		}))
		const sortedAscendingDayData = groupedByMoneyFieldData
			.map(data => ({
				...data,
				total: 0 - (data.receive_money + data.send_money),
			}))
			.sort((a, b) => {
				if (a['time'] < b['time']) {
					return -1
				}
				if (a['time'] > b['time']) {
					return 1
				}
				return 0
			})
		const paymentHistories: {
			time: string
			send_money: number
			receive_money: number
			balance_after: number
			total: number
			buff_viewers_livestream_money: number
		}[] = sortedAscendingDayData

		return (
			<Card style={{ height: '100vh - 65px' }}>
				<Row gutter={16}>
					<Col xs={24}>
						<List
							size="small"
							header={null}
							footer={null}
							dataSource={
								paymentHistories.length > 0
									? seedingAnnoucements
									: [
											...seedingAnnoucements,
											{
												message: (
													<>
														{paymentHistories.length == 0
															? 'Bạn hiện chưa có giao dịch nào. '
															: ''}{' '}
														Trải nghiệm ngay dịch vụ hot nhất site:{' '}
														<span
															style={{
																textDecoration: 'underline',
																fontWeight: 'bold',
																cursor: 'pointer',
															}}
															onClick={() =>
																history.push('/seeding/buff-viewers-livestream')
															}
														>
															TĂNG MẮT NGAY
														</span>
													</>
												),
												type: 'info',
											},
									  ]
							}
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
				</Row>
				<Row
					type="flex"
					align="middle"
					style={{ textAlign: 'center', opacity: 0.5, cursor: 'not-allowed' }}
				>
					{/* <Col lg={12} xs={24}> */}
					{/* <DatePicker
							placeholder="End date"
							onChange={(dates, dateString) => {
								reload({ first: 100, before_time: new Date(dateString).getTime() })
							}
							}
						/>
						<Button
							loading={loading_more}
							type="dashed"
							icon="vertical-align-bottom"
							style={{ margin: 10 }}
							onClick={() => load_more(100)}
						>
							{loading ? 'Loading' : 'Load more 100 transactions'}
						</Button> */}
					{/* <Bar
							data={{
								labels: [
									...paymentHistories.map(paymentHistory => paymentHistory.time),
								],
								datasets: [
									{
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
										data: [
											...paymentHistories.map(
												paymentHistory => paymentHistory.send_money,
											),
										],
									},
									{
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
										data: [
											...paymentHistories.map(
												paymentHistory => paymentHistory.receive_money,
											),
										],
									},
									{
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
										data: [
											...paymentHistories.map(
												paymentHistory => paymentHistory.total,
											),
										],
									},
								],
							}}
							options={options}
						/> */}
					{/* <div style={{ marginTop: 17 }}>
							<Text strong>
								{'Biểu đồ tổng thu chi 7 ngày có giao dịch gần nhất'}
							</Text>
						</div> */}
					{/* </Col> */}
					<Col sm={12} xs={24}>
						<Row gutter={16}>
							<Col md={12} xs={24}>
								<Card>
									<Statistic
										title={<Text strong>{'Balance'.toLocaleUpperCase()}</Text>}
										value={Number(
											paymentHistories[paymentHistories.length - 1]
												?.balance_after || 0,
										).toLocaleString()}
										prefix={<Icon type="dollar" />}
										valueStyle={{ color: '#856c8b' }}
									/>
								</Card>
							</Col>
							<Col md={12} xs={24}>
								<Card>
									<Statistic
										valueStyle={{ color: '#ff1e56' }}
										title={
											<Text strong>{'Send money'.toLocaleUpperCase()}</Text>
										}
										value={Number(
											paymentHistories?.reduce(
												(sendMoney, curr) => sendMoney + curr.send_money,
												0,
											),
										).toLocaleString()}
										prefix={<Icon type="rise" />}
									/>
								</Card>
							</Col>
							<Col md={12} xs={24} style={{ marginTop: 10 }}>
								<Card>
									<Statistic
										valueStyle={{ color: '#ffa41b' }}
										title={
											<Text strong>{'Receive money'.toLocaleUpperCase()}</Text>
										}
										value={Number(
											paymentHistories?.reduce(
												(sendMoney, curr) => sendMoney + curr.receive_money,
												0,
											),
										).toLocaleString()}
										prefix={<Icon type="thunderbolt" theme="filled" />}
									/>
								</Card>
							</Col>
							<Col md={12} xs={24} style={{ marginTop: 10 }}>
								<Card>
									<Statistic
										valueStyle={{ color: '#00bdaa' }}
										title={<Text strong>{'Total'.toLocaleUpperCase()}</Text>}
										value={Number(
											paymentHistories?.reduce(
												(sendMoney, curr) => sendMoney + curr.total,
												0,
											),
										).toLocaleString()}
										prefix={<Icon type="money-collect" />}
									/>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col sm={12} xs={24} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
						<Pie
							options={{
								responsive: true,
								tooltips: {
									mode: 'label',
									callbacks: {
										label: function (tooltipItem, data) {
											console.log('from tooltip')
											console.log({ tooltipItem }, { data })
											let label = data.labels[tooltipItem.index] || ''
											console.log({ label })
											if (label) {
												label += ': '
											}
											console.log()
											label += Number(
												data.datasets[tooltipItem.datasetIndex].data[
													tooltipItem.index
												],
											).toLocaleString()
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
							}}
							data={{
								labels: ['Demo #1', 'Demo #2'],
								datasets: [
									{
										// data: [
										// 	paymentHistories.reduce(
										// 		(sum, payment) =>
										// 			sum + payment.buff_viewers_livestream_money,
										// 		0,
										// 	),
										// 	paymentHistories.reduce(
										// 		(sum, payment) => sum + payment.send_money,
										// 		0,
										// 	),
										// ],
										data: [10000000, 54782134],
										backgroundColor: ['#36A2EB', '#ffb385'],
										hoverBackgroundColor: ['#36A2EB', '#ffb385'],
									},
								],
							}}
						/>
						<div style={{ marginTop: 17 }}>
							<Text strong>
								{paymentHistories.length == 0
									? 'Demo biểu đồ đại lý'
									: 'Biểu đồ phân chia tiền đại lý'}
							</Text>
						</div>
					</Col>
				</Row>
			</Card>
		)
	},
)
