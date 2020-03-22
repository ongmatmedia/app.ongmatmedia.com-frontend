import {
	Card,
	Col,
	Icon,
	List,
	Row,
	Spin,
	Tag,
	Tooltip,
	Avatar,
	Input,
} from 'antd'
import React, { Fragment, useState } from 'react'
import { AgencyAction } from './AgencyAction'
import { ResetPass } from './ResetPass'
import { SendMoneyModal } from './SendMoneyModal'
import { UpdatePriceAgenciesModal } from './UpdatePriceAgenciesModal'
import graphql from 'babel-plugin-relay/macro'
import { UserConnection, User } from '../../types'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { CollaboratorStatics } from './CollaboratorStatics'
import { BreadCrumb } from '../../components/common/BreadCrumb'

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
	const [sent_money_to_user, set_sent_money_to_user] = useState<User | null>(
		null,
	)
	const [
		updatePriceAgenciesModalVisible,
		setUpdatePriceAgenciesModalVisible,
	] = useState<boolean>(false)
	const [
		set_new_pass_for_user,
		set_set_new_pass_for_user,
	] = useState<User | null>(null)

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
			{set_new_pass_for_user && (
				<ResetPass
					visible={true}
					onClose={() => set_set_new_pass_for_user(null)}
					user={set_new_pass_for_user}
				/>
			)}
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
				/>
			</div>
			<CollaboratorStatics
				users={data.users.edges.map(n => n.node)}
				onChangeSearchUsername={username => setSearchUsername(username)}
			/>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 8,
				}}
				dataSource={data.users.edges
					.map(n => n.node)
					.sort(
						(a, b) => b.balance / b.price_percent - a.balance / a.price_percent,
					)
					.filter(user => user.username.match(`${searchUsername}`))}
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
										<Col style={{ paddingRight: 5 }}>
											{/* <Avatar>{item.username.substring(0, 1)}</Avatar> */}
										</Col>
										<Col>
											<span style={{ fontWeight: 'bold' }}>
												{item.username}
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
									<Tooltip placement="bottom" title="Set new password">
										<Icon
											type="unlock"
											key="unlock"
											onClick={() => set_set_new_pass_for_user(item)}
										/>
									</Tooltip>,
								]}
								style={{ lineHeight: '2em' }}
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
