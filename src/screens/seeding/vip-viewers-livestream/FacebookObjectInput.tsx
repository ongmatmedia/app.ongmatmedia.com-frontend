import React, { useState } from 'react'
import { Input, Icon } from 'antd'
import { FacebookAccount } from '../../../api/FacebookAccount'

export enum LivestreamFacebookTargetType {
	profile = 'profile',
	group = 'group',
	page = 'page',
}

export type FacebookObjectInputProps = {
	// onSelect: (obj: {
	// 	name: string
	// 	id: string
	// 	image: string
	// 	type: LivestreamFacebookTargetType
	// }) => any
	onSelect: (data: { url: string }) => void
	onError?: Function
	placeholder?: string
	defaultValue?: string
}

export const FacebookObjectInput = (props: FacebookObjectInputProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [value, set_value] = useState<string>(props.defaultValue || '')

	const submit = async () => {
		set_loading(true)
		try {
			// const { name, type, uid: id } = await FacebookAccount.getUIDFromURL(value)
			// props.onSelect({
			// 	image:
			// 		type != 'group'
			// 			? `http://graph.facebook.com/${id}/picture?type=large`
			// 			: 'https://leadershiproundtable.org/wp-content/uploads/2015/09/group-1824145_1280.png',
			// 	name,
			// 	id,
			// 	type,
			// })
			props.onSelect({
				url: value,
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
