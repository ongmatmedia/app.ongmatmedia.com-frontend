import { Card, Col, Icon, Row, Statistic, List, Alert } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { withRouter } from 'react-router-dom'
import { getRandomInt, nFormatter, randomDate, range } from '../helpers/utils'

const dataMoneyOne = {
	labels: [...range(1, 7)].map(el =>
		randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString('vi', {
			hour12: true,
		}),
	),
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
			data: [...range(1, 7)].map(el => getRandomInt(100000, 1000000)),
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
			data: [...range(1, 7)].map(el => getRandomInt(100000, 1000000)),
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
			data: [...range(1, 7)].map(el => getRandomInt(10000000, 1000000000)),
		},
	],
}

const dataMoneyTwo = {
	labels: ['Hoàn', 'Cộng'],
	datasets: [
		{
			data: [100, 900],
			backgroundColor: ['#400082', '#d8ebb5'],
			hoverBackgroundColor: ['#400082', '#d8ebb5'],
		},
	],
}

const dataMoneyThree = {
	labels: ['Mắt', 'Đại lý', 'Live'],
	datasets: [
		{
			data: [3000, 4000, 5000],
			backgroundColor: ['#36A2EB', '#ffb385', '#d63447'],
			hoverBackgroundColor: ['#36A2EB', '#ffb385', '#d63447'],
		},
	],
}

const options = {
	responsive: true,
	tooltips: {
		mode: 'label',
		callbacks: {
			label: function(tooltipItem, data) {
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
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: false,
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
			},
		],
	},
}

const seedingAnnoucements = [
	{
		type: 'info',
		message:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
	},
	{
		type: 'info',
		message:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
	},
	{
		type: 'error',
		message:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
	},
]

export const HomePage = withRouter(props => (
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
								value={Number(1000000).toLocaleString()}
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
								value={Number(200000).toLocaleString()}
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
								value={Number(800000).toLocaleString()}
								prefix={<Icon type="thunderbolt" theme="filled" />}
							/>
						</Card>
					</Col>
					<Col sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card>
							<Statistic
								valueStyle={{ color: '#00bdaa' }}
								title={<Text strong>{'Total'.toLocaleUpperCase()}</Text>}
								value={Number(10000000).toLocaleString()}
								prefix={<Icon type="money-collect" />}
							/>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row type="flex" align="middle" style={{ textAlign: 'center' }}>
			<Col lg={12} xs={24}>
				<Bar data={dataMoneyOne} options={options} />
				<div style={{ marginTop: 17 }}>
					<Text strong>{'Biểu đồ tổng thu chi 7 ngày gần nhất'}</Text>
				</div>
			</Col>
			<Col lg={6} xs={24}>
				<Doughnut data={dataMoneyTwo} />
				<div style={{ marginTop: 17 }}>
					<Text strong>{'Biểu đồ tiền hoàn cộng'}</Text>
				</div>
			</Col>
			<Col lg={6} xs={24}>
				<Pie data={dataMoneyThree} />
				<div style={{ marginTop: 17 }}>
					<Text strong>{'Biểu đồ phân chia tiền đại lý'}</Text>
				</div>
			</Col>
		</Row>
	</Card>
))
