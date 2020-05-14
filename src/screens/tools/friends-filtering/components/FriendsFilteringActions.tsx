import {Alert, Avatar, Button, Col, Form, Row, Select, Tooltip} from 'antd'
import {FormComponentProps} from 'antd/lib/form'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import graphql from 'babel-plugin-relay/macro'
import React, {useEffect, useState} from 'react'
import {GraphQLQueryFetcher} from '../../../../graphql/GraphQLWrapper'
import {withFilterFriendsStore} from '../../../../libs/filter-friends/store'
import {Extension} from '../../../../libs/filter-friends/Extension'

const {Option} = Select

const query = graphql`
	query FriendsFilteringActionsGetFacebookAccountsQuery {
		facebook_accounts {
			edges {
				node {
					id
					name
					cookie
				}
			}
		}
	}
`

export const FriendsFilteringActions = Form.create()(
	withFilterFriendsStore<FormComponentProps>(props =>
	{
		const submit = () =>
		{
			props.form.validateFields(async (err, values) =>
			{
				if (!err)
				{
					const user_id_match = values.cookie
						.toString()
						.match(/c_user=([0-9]+)/)
					if (user_id_match)
					{
						const user_id = user_id_match[1]
						const data = await Extension.get_facebook_current_user()
						if (data?.uid == user_id)
						{
							// Send request with new cookie if user select logged facebook account in computer
							await props.store.load(data.cookie, values.limit)
						} else await props.store.load(values.cookie, values.limit)
					}
				}
			})
		}

		const delete_friends = async () =>
		{
			Modal.confirm({
				title: 'Do you want to delete multiple friends',
				content: `You are going to delete ${props.store?.selected_friends?.length} friends`,
				onOk: () =>
				{
					props.store.delete_friends(props.store?.selected_friends, 5)
				},
			})
		}

		const [accounts, setAccounts] = useState<
			{id: string; cookie: string; name: string}[]
		>([])
		const [error, setError] = useState<string | null>(null)

		useEffect(() =>
		{
			const fn = async () =>
			{
				try
				{
					props.store.error = null
					const {
						facebook_accounts: {edges},
					} = await GraphQLQueryFetcher<{
						facebook_accounts: {
							edges: {node: {id: string; name: string; cookie: string}}[]
						}
					}>(query, {})
					setAccounts(edges.map(edge => edge.node))
				} catch (error)
				{
					setError(error)
				}
			}
			fn()
		}, [])

		return (
			<Form style={{width: '100%'}}>
				{props.store.error && (
					<Alert
						showIcon
						message={props.store.error}
						type="error"
						style={{marginBottom: 10}}
					/>
				)}
				{!!error && (
					<Alert
						showIcon
						message={error}
						type="error"
						style={{marginBottom: 10}}
					/>
				)}
				<Row gutter={16} style={{marginBottom: 15}}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item>
							{props.form.getFieldDecorator('cookie', {
								rules: [{required: true, message: 'Account is invalid!'}],
							})(
								<Select
									style={{minWidth: 200}}
									size="large"
									placeholder="Select an account"
									onChange={() => props.store?.friends.clear()}
								>
									{accounts.map(account => (
										<Option key={account.id} value={account.cookie}>
											<Avatar
												src={`https://graph.facebook.com/${account.id}/picture?type=large`}
											/>
											&nbsp; {account.name}
										</Option>
									))}
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Row gutter={16}>
							<Col xs={24} sm={12}>
								<Form.Item>
									{props.form.getFieldDecorator('limit', {
										initialValue: 500,
									})(
										<Select>
											{[
												10,
												20,
												30,
												50,
												100,
												200,
												300,
												500,
												1000,
												1500,
												2000,
												2500,
												3000,
												3500,
												4000,
												4500,
												5000,
											].map(n => (
												<Option key={n} value={n}>
													Scan {n} posts
												</Option>
											))}
										</Select>,
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12}>
								<Form.Item>
									<Tooltip
										title="Start scan all your friends and inbox, comment, reaction, ..."
										placement="bottom"
									>
										<Button
											loading={props.store.loading_status == 'get_access_token'}
											icon="search"
											type="primary"
											onClick={submit}
											style={{width: '100%'}}
										>
											Scan all friends
										</Button>
									</Tooltip>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col xs={24} md={24}>
						<Row gutter={16}>
							<Col xs={24} sm={12} md={18} style={{marginTop: 7}}>
								<Input
									onChange={e => (props.store.search_name = e.target.value)}
									allowClear
									placeholder="Search name"
								/>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={6}
								style={{textAlign: 'center', marginTop: 7}}
							>
								<Button
									style={{width: '100%'}}
									disabled={props.store?.selected_friends?.length == 0}
									type="danger"
									icon="close"
									onClick={async () => await delete_friends()}
								>
									Remove {props.store?.selected_friends?.length} friends
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		)
	}),
)
