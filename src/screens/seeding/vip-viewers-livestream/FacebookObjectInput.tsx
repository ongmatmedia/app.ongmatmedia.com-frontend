import React, { useState } from 'react'
import { Input, Icon } from 'antd'
import { FacebookAccount } from '../../../api/FacebookAccount'
import { LivestreamFacebookTargetType } from '../../livestream/SharingComponents/LivestreamFacebookTargetType'
import { graphql } from 'babel-plugin-relay/macro'
import { GraphQLQueryFetcher } from '../../../graphql/GraphQLWrapper'
import { FacebookProfile } from '../../../types'

export type FacebookObjectInputProps = {
	onSelect: (data: {
		name: string
		id: string
		image: string
		type: LivestreamFacebookTargetType
	}) => any
	onError?: Function
	placeholder?: string
	defaultValue?: string
}

const query = graphql`
	query FacebookObjectInputQuery($url: String!) {
		profile_info(url: $url) {
			uid
			name
			type
		}
	}
`

export const FacebookObjectInput = (props: FacebookObjectInputProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [value, set_value] = useState<string>(props.defaultValue || '')

	const submit = async () => {
		set_loading(true)
		try {
			const { profile_info } = await GraphQLQueryFetcher<{
				profile_info: FacebookProfile
			}>(query, { url: value.replace('profile.php?id=', '') })
			const { name, type, uid } = profile_info
			props.onSelect({
				image:
					type !== LivestreamFacebookTargetType.group
						? `http://graph.facebook.com/${uid}/picture?type=large`
						: 'https://www.codester.com/static/uploads/items/5415/icon.png',
				name,
				id: uid,
				type: type as LivestreamFacebookTargetType,
			})
			set_loading(false)
			set_value('')
		} catch (e) {
			set_loading(false)
			set_value('')
			props.onError && props.onError()
		}
	}

	return (
		<Input
			addonAfter={
				<Icon
					type={loading ? 'loading' : 'search'}
					style={{ cursor: 'pointer' }}
					onClick={submit}
				/>
			}
			allowClear
			value={value}
			onChange={e => set_value(e.target.value)}
			placeholder={props.placeholder || ''}
		/>
	)
}
