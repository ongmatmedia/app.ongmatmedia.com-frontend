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
			data: [...range(1, 100)].map(el => getRandomInt(100000, 1000000)),
		},
		{
			yAxisID: 'y-axis-1',
			type: 'line',
			label: 'Receive money',
			fill: false,
			lineTension: 0.1,
			backgroundColor: '#2b580c',
			borderColor: '#2b580c',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: '#2b580c',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: '#2b580c',
			pointHoverBorderColor: '#2b580c',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [...range(1, 100)].map(el => getRandomInt(100000, 1000000)),
		},
		{
			yAxisID: 'y-axis-2',
			type: 'bar',
			label: 'Total money',
			fill: false,
			lineTension: 0.1,
			backgroundColor: '#36A2EB',
			borderColor: '#36A2EB',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: '#36A2EB',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: '#36A2EB',
			pointHoverBorderColor: '#36A2EB',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [...range(1, 100)].map(el => getRandomInt(10000000, 1000000000)),
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
		xAxes: [{ display: true }],
		yAxes: [
			{
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				gridLines: {
					display: false,
				},
				labels: {
					show: true,
				},
				beginAtZero: false,
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
					display: false,
				},
				labels: {
					show: true,
				},
				beginAtZero: false,
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
							type={item.type}
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
								title="Balance"
								value={Number(1000000).toLocaleString()}
								prefix={<Icon type="dollar" />}
								valueStyle={{ color: '#000839' }}
							/>
						</Card>
					</Col>
					<Col sm={12} xs={24}>
						<Card>
							<Statistic
								valueStyle={{ color: '#ffa41b' }}
								title="Send money"
								value={Number(200000).toLocaleString()}
								prefix={<Icon type="rise" />}
							/>
						</Card>
					</Col>
					<Col sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card>
							<Statistic
								valueStyle={{ color: '#2b580c' }}
								title="Receive money"
								value={Number(800000).toLocaleString()}
								prefix={<Icon type="fall" />}
							/>
						</Card>
					</Col>
					<Col sm={12} xs={24} style={{ marginTop: 10 }}>
						<Card>
							<Statistic
								valueStyle={{ color: 'rgb(64, 169, 255)' }}
								title="Total"
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
