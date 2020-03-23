import { Button, Card, List, Modal, Row, Spin, Tooltip } from 'antd'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { PaymentMethod } from '../../types'
import { AutoDepositModal } from './AutoDepositModal'
import { PaymentInfoModal } from './PaymentInfoModal'


type DepositMethod = {
	name: string
	account: string
	cover: string
	icon: string
}

const query = graphql`
	query depositQuery {
		payment_methods {
			name
			owner
			description
			account
		}
	}
`

const Preview = (props: { payment_methods: PaymentMethod[] }) => {
	const [paymentInfoModalIsVisible, setVisibleForPaymentInfoModal] = useState(
		false,
	)
	const [
		currentPaymentMethod,
		setCurrentPaymentMethod,
	] = useState<PaymentMethod | null>(null)

	return (
		<>
			<PaymentInfoModal
				isVisible={paymentInfoModalIsVisible}
				onClose={() => setVisibleForPaymentInfoModal(false)}
				data={currentPaymentMethod}
			/>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 1,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 6,
				}}
				dataSource={props.payment_methods}
				renderItem={item => (
					<List.Item>
						<Tooltip placement="top" title="Click to see detail information">
							<Card
								size="small"
								onClick={() => {
									setCurrentPaymentMethod(item)
									setVisibleForPaymentInfoModal(true)
								}}
							></Card>
						</Tooltip>
					</List.Item>
				)}
			/>
		</>
	)
}

export const DepositPage = GraphQLWrapper<{ payment_methods: PaymentMethod[] }>(
	query,
	{},
	({ loading, data }) => (
		<Card title="Deposit">
			{['localhost', '192.168', 'ongmatmedia', 'fbmedia']
				.map(domain => window.location.hostname.includes(domain))
				.includes(true) && (
				<Row style={{ marginBottom: 10 }}>
					<Button
						icon="sync"
						type="primary"
						onClick={() =>
							Modal.info({
								title: 'QRPAY',
								content: <AutoDepositModal />,
							})
						}
					>
						Nạp auto
					</Button>
				</Row>
			)}

			<Spin spinning={loading}>
				<Row style={{ height: 20 }}></Row>
			</Spin>
			{data && <Preview payment_methods={data.payment_methods} />}
		</Card>
	),
)
