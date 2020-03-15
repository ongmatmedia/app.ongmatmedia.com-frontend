import { Alert, Avatar, Icon, Input, Row } from 'antd'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { GraphQLQueryFetcher } from '../graphql/GraphQLWrapper'
import { FacebookAccount } from '../types'
import { FacebookAvatar } from '../components/FacebookAvatar'

const query = graphql`
	query FacebookAccountInputQuery($url: String!) {
		facebook_account_info(url: $url) {
			name
			id
		}
	}
`

export type FacebookAccountInputProps = {
	account?: { id: string; name: string }
	onChange?: (account: FacebookAccount) => any
}

export const FacebookAccountInput = (props: FacebookAccountInputProps) => {
	const [url, set_url] = useState<string>(props.account?.name || '')
	const [loading, set_loading] = useState<boolean>(false)
	const [editable, set_editable] = useState<boolean>(!props.account)
	const [error, set_error] = useState<string | null>(null)

	const search = async () => {
		set_loading(true)
		set_error(null)
		try {
			const { facebook_account_info } = await GraphQLQueryFetcher<{
				facebook_account_info: FacebookAccount
			}>(query, { url })
			props.onChange && props.onChange(facebook_account_info)
			set_url(facebook_account_info.name)
			set_editable(false)
		} catch (error) {
			console.log(error)
			set_error('Not found')
		}
		set_loading(false)
	}

	return (
		<Row type="flex" justify="start">
			<Input
				addonBefore={
					props.account && (
						<FacebookAvatar uid={props.account.id} size="large" />
					)
				}
				addonAfter={
					<Icon
						type={loading ? 'loading' : editable ? 'search' : 'edit'}
						style={{ cursor: 'pointer' }}
						onClick={() =>
							!loading && (editable ? search() : set_editable(true))
						}
					/>
				}
				size="large"
				value={url}
				allowClear={editable}
				onChange={e => set_url(e.target.value)}
				disabled={!editable}
			/>
			{error && <Alert type="error" style={{ marginTop: 5 }} message={error} />}
		</Row>
	)
}
