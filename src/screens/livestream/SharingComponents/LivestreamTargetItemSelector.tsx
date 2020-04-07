import Alert from 'antd/lib/alert'
import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { FacebookGraphAPI } from '../../../api/FacebookGraphAPI'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { FacebookAccount, FacebookAccountConnection, LivestreamFacebookTargetInput } from '../../../types'

const getAccountsQuery = graphql`
	query LivestreamTargetItemSelectorTabQuery {
		facebook_accounts {
			edges {
				node {
					id
					touch_access_token
					name
				}
			}
		}
	}
`

const { Option } = Select

export type LivestreamTargetItemSelectorProps = {
	selected: string[]
	onSelect: (target: LivestreamFacebookTargetInput) => void
	onClose: Function
}

const Loading = () => (
	<Row type="flex" justify="space-around">
		<Col>
			<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
		</Col>
	</Row>
)

const FacebookIcon = {
	profile:
		'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png',
	group: 'https://www.codester.com/static/uploads/items/5415/icon.png',
	page:
		'https://www.socialmediaexaminer.com/wp-content/uploads/2014/07/kl-facebook-pages-app-logo.jpg',
}

interface Account {
	id: string
	touch_access_token: string
	name: string
}

export const LivestreamTargetItemSelector = (
	props: LivestreamTargetItemSelectorProps,
) => {
	const [currentAccount, setCurrentAccount] = useState<Account>()

	const [selectingTarget, setSelectingTarget] = useState<boolean>(false)

	const [groupsAndPagesInfo, setGroupsAndPageInfo] = useState<
		Array<{ id: string; name: string; type: string }>
	>()

	const [loadingGroupsAndPages, setLoadingGroupsAndPages] = useState<boolean>(
		false,
	)

	const fetchGroupsOrPageInfo = async (fb: FacebookGraphAPI, type: string) => {
		const url = `/me/${type == 'page' ? 'accounts' : 'groups'}`
		try {
			const { data } = await fb.get<{
				data: Array<{ name: string; id: string }>
			}>(url)
			return data.map(el => ({ id: el.id, name: el.name, type }))
		} catch (error) {
			throw error
		}
	}

	const fetchTargetInfo = async account => {
		setSelectingTarget(true)
		setCurrentAccount(account)
		setLoadingGroupsAndPages(true)
		const fb = new FacebookGraphAPI(account.touch_access_token)
		try {
			const pagesInfo = await fetchGroupsOrPageInfo(fb, 'page')
			const groupsInfo = await fetchGroupsOrPageInfo(fb, 'group')
			setGroupsAndPageInfo([...pagesInfo, ...groupsInfo])
		} catch (error) {
			console.error(error)
		}
		setLoadingGroupsAndPages(false)
	}

	return (
		<span>
			<QueryRenderer
				environment={RelayEnvironment}
				query={getAccountsQuery}
				variables={{}}
				render={rs => {
					const accounts_loading = rs.props == null
					const accounts: FacebookAccount[] = accounts_loading
						? []
						: ((rs.props as any)
								.facebook_accounts as FacebookAccountConnection).edges.map(
								e => e.node,
						  )

					if (accounts_loading) return <Loading />
					else if (accounts.length == 0) {
						return (
							<Alert
								message="Add a facebook account to system to broadcast livestream !"
								type="warning"
							/>
						)
					} else {
						const selectableAccounts = accounts.filter(account => true)
						return (
							<>
								<Select
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children &&
										option.props.children[1].props.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									placeholder="Select a person"
									size="large"
									onChange={accountId =>
										fetchTargetInfo(
											selectableAccounts.filter(acc => acc.id == accountId)[0],
										)
									}
									style={{ marginBottom: 20 }}
								>
									{selectableAccounts.map(({ id, name }) => (
										<Option value={id} style={{ marginBottom: 10 }} key={id}>
											<Avatar
												src={`http://graph.facebook.com/${id}/picture?type=large`}
												size="small"
												style={{ marginRight: 15 }}
											/>
											<span>{name}</span>
										</Option>
									))}
								</Select>
								{selectingTarget &&
									currentAccount &&
									!props.selected.includes(currentAccount.id) && (
										<>
											<Button
												type="primary"
												style={{ marginBottom: 20 }}
												size="large"
												icon="plus"
												onClick={() =>
													props.selected.every(
														el => el !== currentAccount.id,
													) &&
													props.onSelect({
														uid: currentAccount.id,
														name: currentAccount.name,
														owner: currentAccount.id,
														type: 'profile',
													})
												}
											>
												Live in this profile
											</Button>
										</>
									)}
								{selectingTarget && currentAccount && loadingGroupsAndPages && (
									<Loading />
								)}
								{selectingTarget && currentAccount && groupsAndPagesInfo && (
									<Select
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children &&
											option.props.children[1].props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										placeholder="Select a groups or page"
										size="large"
										style={{ marginBottom: 20 }}
										onChange={id =>
											props.selected.every(el => el !== id) &&
											props.onSelect({
												uid: groupsAndPagesInfo.filter(el => el.id == id)[0].id,
												name: groupsAndPagesInfo.filter(el => el.id == id)[0]
													.name,
												owner: currentAccount.id,
												type: groupsAndPagesInfo.filter(el => el.id == id)[0]
													.type,
											})
										}
									>
										{groupsAndPagesInfo.map(({ id, name, type }) => (
											<Option value={id} style={{ marginBottom: 10 }} key={id}>
												<Avatar
													src={FacebookIcon[`${type}`]}
													style={{ marginRight: 10 }}
												/>
												<span>{name}</span>
											</Option>
										))}
									</Select>
								)}
							</>
						)
					}
				}}
			/>
		</span>
	)
}
