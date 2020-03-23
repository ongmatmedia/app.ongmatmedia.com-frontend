import { Button, Card, Col, Icon, List, message, Modal, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { NoteReading } from '../../components/common/NoteReading'
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
					md: 4,
				}}
				dataSource={props.payment_methods}
				renderItem={item => (
					<List.Item>
						<Card
							size="small"
							type="inner"
							style={{
								textAlign: 'center',
								backgroundColor: 'white',
								borderRadius: 10,
								boxShadow:
									'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
							}}
							title={<Text strong>{item.name}</Text>}
							extra={
								<CopyToClipboard
									text={item.account}
									onCopy={() => message.info('Bank account is copied')}
								>
									<Icon type="copy" style={{ fontSize: 20 }} />
								</CopyToClipboard>
							}
						>
							<Row
								style={{ marginBottom: 15, cursor: 'pointer' }}
								onClick={() => {
									setCurrentPaymentMethod(item)
									setVisibleForPaymentInfoModal(true)
								}}
							>
								{Object.keys(item).map(
									keyName =>
										keyName !== 'description' &&
										keyName !== 'name' && (
											<Col xs={24}>
												<Row>
													<Col span={12} style={{ textAlign: 'left' }}>
														<Text strong>
															{keyName.charAt(0).toUpperCase() +
																keyName.substring(1).replace(/_/g, ' ')}
														</Text>
													</Col>
													<Col span={12} style={{ textAlign: 'right' }}>
														{item[keyName]}
													</Col>
												</Row>
											</Col>
										),
								)}
								<NoteReading note={item.description} collapse={false} />
							</Row>
						</Card>
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
