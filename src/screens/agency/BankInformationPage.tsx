import { Button, Card, Col, List, Row, Icon, Popconfirm, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { NoteReading } from '../../components/common/NoteReading'
import { CreateUpdateBankModal } from './CreateUpdateBankModal'
import graphql from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { User, PaymentMethod } from '../../types'

export interface Bank {
	name: string
	owner: string
	account_number: string
	department: string
	transaction_content: string
}

const query = graphql`
	query BankInformationPageQuery {
		me {
			payment_methods {
				name
      	owner
      	description
      	account
			}
		}
	}
`

export const BankInformationPage = GraphQLWrapper<{
	me: User
}>(query, {}, ({ loading, data }) => {

	if (loading)
		return (
			<Card title={<BreadCrumb />} style={{ height: '100vh' }}>
				<Row type="flex" justify="space-around">
					<Col>
						<Spin
							indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
						/>
					</Col>
				</Row>
			</Card>
		)

	const [banks, setBanks] = useState<PaymentMethod[]>(data.me.payment_methods)
	const [
		createUpdateBankModalVisible,
		setCreateUpdateBankModalVisible,
	] = useState<boolean>(false)
	const [selectedBank, setSelectedBank] = useState<PaymentMethod | null>()
	const [modalMode, setModalMode] = useState<'create' | 'update'>()

	return (
		<Card title={<BreadCrumb />} style={{ height: 'calc(100vh - 65px)' }}>
			<Button
				type="primary"
				style={{ marginBottom: 15 }}
				onClick={() => {
					setModalMode('create')
					setSelectedBank(null)
					setCreateUpdateBankModalVisible(true)
				}}
			>
				Add a bank
			</Button>
			<CreateUpdateBankModal
				visible={createUpdateBankModalVisible}
				onClose={() => setCreateUpdateBankModalVisible(false)}
				mode={modalMode}
				seletedBank={selectedBank}
				banks={data.me.payment_methods}
			/>
			<List
				grid={{
					gutter: 24,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
					xxl: 6,
				}}
				dataSource={banks}
				renderItem={item => (
					<List.Item>
						<Card
							type="inner"
							style={{
								textAlign: 'center',
								backgroundColor: 'white',
								borderRadius: 10,
								boxShadow:
									'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
								cursor: 'pointer',
							}}
							onClick={() => {
								setSelectedBank(item)
								setModalMode('update')
								setCreateUpdateBankModalVisible(true)
							}}
							title={<Text strong>{item.name}</Text>}
							extra={
								<Popconfirm
									title="Are you sure delete this bank?"
									onConfirm={() =>
										setBanks([
											...banks.filter(
												bank => bank.account !== item.account,
											),
										])
									}
									okText="Yes"
									cancelText="No"
								>
									<Icon type="delete" style={{ color: 'red' }} />
								</Popconfirm>
							}
							headStyle={{ textAlign: 'left' }}
						>
							<Row style={{ marginBottom: 15 }}>
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
								<NoteReading note={item.description} />
							</Row>
						</Card>
					</List.Item>
				)}
			/>
		</Card>
	)
})

