import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import Tag from 'antd/lib/tag'
import Tooltip from 'antd/lib/tooltip'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { User, UserConnection } from '../../types'
import { AgencyAction } from './AgencyAction'
import { CollaboratorStatics } from './CollaboratorStatics'
import { SendMoneyModal } from './SendMoneyModal'
import { UpdatePriceAgenciesModal } from './UpdatePriceAgenciesModal'

const query = graphql`
	query CollaboratorsListPageQuery {
		users {
			edges {
				node {
					username
					id
					balance
					price_percent
					created_at
					pricing {
						buff_viewers_livestream
						vip_viewers_livestream
						livestream {
							p480
							p720
							p1080
						}
					}
				}
			}
		}

		me {
			price_percent
			balance
			username
		}
	}
`

export const CollaboratorsListPage = GraphQLWrapper<{
	users: UserConnection
	me: User
}>(query, {}, ({ loading, data }) => {
	if (loading)
		return (
			<Card title={<BreadCrumb />} style={{ height: '100%' }}>
				<Row type="flex" justify="space-around">
					<Col>
						<Spin
							indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
						/>
					</Col>
				</Row>
			</Card>
		)
	const [sent_money_to_user, set_sent_money_to_user] = useState<User | null>(
		null,
	)
	const [
		updatePriceAgenciesModalVisible,
		setUpdatePriceAgenciesModalVisible,
	] = useState<boolean>(false)

	const [selectedAgencies, setSelectedAgencies] = useState(new Set<User>())

	const [searchUsername, setSearchUsername] = useState<string>('')

	const handleSelectAgencies = (user: User) => {
		if (selectedAgencies.has(user)) {
			selectedAgencies.delete(user)
			setSelectedAgencies(new Set(selectedAgencies))
		} else setSelectedAgencies(new Set(selectedAgencies.add(user)))
	}

	const onSelectAgencyAndOpenModal = (user: User) => {
		setSelectedAgencies(new Set([user]))
		setUpdatePriceAgenciesModalVisible(true)
	}

	return (
		<Card title={<BreadCrumb />}>
			{sent_money_to_user && (
				<SendMoneyModal
					onClose={() => set_sent_money_to_user(null)}
					visible={true}
					user={sent_money_to_user}
					me={data.me}
				/>
			)}
			{updatePriceAgenciesModalVisible && (
				<UpdatePriceAgenciesModal
					onClose={() => setUpdatePriceAgenciesModalVisible(false)}
					visible={updatePriceAgenciesModalVisible}
					selectedAgencies={selectedAgencies}
				/>
			)}
			<CollaboratorStatics users={data.users.edges.map(n => n.node)} />
			<div style={{ paddingBottom: 10 }}>
				<AgencyAction
					selectedAgencies={selectedAgencies}
					onRemoveAllSelectedAgencies={() => {
						setSelectedAgencies(new Set())
					}}
					onSelectAllAgencies={() => {
						const listUsers = data ? data.users.edges.map(n => n.node) : []
						setSelectedAgencies(new Set(listUsers))
					}}
					onOpenUpdatePriceAgenciesModal={() => {
						setUpdatePriceAgenciesModalVisible(!updatePriceAgenciesModalVisible)
					}}
					onChangeSearchUsername={username =>
						setSearchUsername(username.trim().toLocaleLowerCase())
					}
					updatePriceAgenciesModalVisible={updatePriceAgenciesModalVisible}
				/>
			</div>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
					xxl: 6,
				}}
				dataSource={data.users.edges
					.map(n => n.node)
					.sort(
						(a, b) => b.balance / b.price_percent - a.balance / a.price_percent,
					)
					.filter(user =>
						user.username.trim().toLocaleLowerCase().match(`${searchUsername}`),
					)}
				renderItem={item => {
					const percent = item.price_percent
					const balance = item.balance.toLocaleString(undefined, {
						maximumFractionDigits: 0,
					})

					return (
						<List.Item
							style={{
								border: selectedAgencies.has(item)
									? '2px solid #1890ff'
									: '2px solid white',
							}}
						>
							<Card
								title={
									<Row
										type="flex"
										align="middle"
										justify="start"
										onClick={() => handleSelectAgencies(item)}
										style={{ cursor: 'pointer' }}
									>
										<Col style={{ paddingRight: 5 }}></Col>
										<Col>
											<span style={{ fontWeight: 'bold' }}>
												{item.username.length >= 18 &&
												!isMobileOnly &&
												window.innerWidth < 1350
													? item.username.substring(0, 15) + '...'
													: item.username}
											</span>
										</Col>
									</Row>
								}
								actions={[
									<Tooltip placement="bottom" title="Deposit">
										<Icon
											type="dollar"
											key="dollar"
											onClick={() => set_sent_money_to_user(item)}
										/>
									</Tooltip>,
									<Tooltip placement="bottom" title="Change price percent">
										<Icon
											type="percentage"
											key="percentage"
											onClick={() => onSelectAgencyAndOpenModal(item)}
										/>
									</Tooltip>,
								]}
								style={{ lineHeight: '2em' }}
								bodyStyle={{ height: 105 }}
							>
								<Row type="flex" align="middle" justify="space-between">
									<Col>Price</Col>
									<Col>
										<Tag color={percent >= 100 ? '#108ee9' : 'rgb(234, 16, 6)'}>
											{percent} %
										</Tag>
									</Col>
								</Row>
								<Row type="flex" align="middle" justify="space-between">
									<Col>Balance</Col>
									<Col>
										<Tag color="#108ee9">{balance} $</Tag>
									</Col>
								</Row>
							</Card>
						</List.Item>
					)
				}}
			/>
		</Card>
	)
})
