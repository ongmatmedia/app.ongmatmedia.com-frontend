import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import notification from 'antd/lib/notification'
import Popconfirm from 'antd/lib/popconfirm'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import Text from 'antd/lib/typography/Text'
import graphql from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {BreadCrumb} from '../../components/common/BreadCrumb'
import {NoteReading} from '../../components/common/NoteReading'
import {GraphQLWrapper} from '../../graphql/GraphQLWrapper'
import {update_profile} from '../../graphql/update_profile'
import {exportBankIcon} from '../../helpers/utils'
import {PaymentMethod, User} from '../../types'
import {CreateUpdateBankModal} from './CreateUpdateBankModal'
import {Fab} from 'react-tiny-fab'

export interface Bank
{
	name: string
	owner: string
	account_number: string
	department: string
	transaction_content: string
}

const query = graphql`
	query BankInformationPageQuery {
		me {
			id
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
}>(query, {}, ({loading, data}) =>
{
	if (loading)
		return (
			<Card title={<BreadCrumb />} style={{minHeight: '100%'}}>
				<Row type="flex" justify="space-around">
					<Col>
						<Spin
							indicator={<Icon type="loading" style={{fontSize: 24}} />}
						/>
					</Col>
				</Row>
			</Card>
		)
	if (!loading && data)
	{
		const [
			createUpdateBankModalVisible,
			setCreateUpdateBankModalVisible,
		] = useState<boolean>(false)
		const [selectedBank, setSelectedBank] = useState<PaymentMethod | null>()
		const [modalMode, setModalMode] = useState<'create' | 'update'>()
		const [deletedBank, setDeletedBank] = useState<string>()

		return (
			<Card title={<BreadCrumb />} style={{height: '100%'}} >
				{
					!createUpdateBankModalVisible && (
						<Fab
							mainButtonStyles={{backgroundColor: '#1890ff'}}
							icon={<Icon type="plus" />}
							event="click"
							onClick={() =>
							{
								setModalMode('create')
								setSelectedBank(null)
								setCreateUpdateBankModalVisible(true)
							}}
						/>
					)
				}
				<CreateUpdateBankModal
					visible={createUpdateBankModalVisible}
					onClose={() => setCreateUpdateBankModalVisible(false)}
					mode={modalMode}
					seletedBank={selectedBank}
					paymentMethods={data.me.payment_methods}
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
					dataSource={data.me?.payment_methods || []}
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
								}}
								cover={
									<Row type="flex" justify="center">
										<Col xs={24}>
											<Avatar
												src={exportBankIcon(item.name)}
												size={100}
												shape="square"
											/>
										</Col>
									</Row>
								}
								title={<Text strong>{item.name}</Text>}
								extra={
									<Popconfirm
										title="Are you sure delete this bank?"
										onConfirm={async () =>
										{
											setDeletedBank(item.account)
											await update_profile({
												payment_methods: [
													...data.me.payment_methods.filter(
														paymentMethod =>
															paymentMethod.account !== item.account,
													),
												],
											})
											notification.success({
												message: 'Delete bank successfully',
											})
											setDeletedBank('')
										}}
										okText="Yes"
										cancelText="No"
									>
										{item.account !== deletedBank ? (
											<Icon type="delete" style={{color: 'red'}} />
										) : (
												<Icon type="loading" style={{color: 'blue'}} />
											)}
									</Popconfirm>
								}
								headStyle={{textAlign: 'left'}}
							>
								<Row
									style={{marginBottom: 15, cursor: 'pointer'}}
									onClick={() =>
									{
										setSelectedBank(item)
										setModalMode('update')
										setCreateUpdateBankModalVisible(true)
									}}
								>
									{Object.keys(item).map(
										keyName =>
											keyName !== 'description' &&
											keyName !== 'name' && (
												<Col xs={24}>
													<Row>
														<Col span={12} style={{textAlign: 'left'}}>
															<Text strong>
																{keyName.charAt(0).toUpperCase() +
																	keyName.substring(1).replace(/_/g, ' ')}
															</Text>
														</Col>
														<Col span={12} style={{textAlign: 'right'}}>
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
			</Card>
		)
	}
})
