import React, { useState } from 'react'
import { Input, Icon } from 'antd'

export enum LivestreamFacebookTargetType {
	profile = 'profile',
	group = 'group',
	page = 'page',
}

export type VideoInputProps = {
	onSelect: (obj: {
		name: string
		id: string
		image: string
		uid: string
		type: LivestreamFacebookTargetType
	}) => any
	onError?: Function
	placeholder?: string
}

export const VideoInput = (props: VideoInputProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [value, set_value] = useState<string>('')

	const submit = async () => {
		set_loading(true)
		try {
			// const { title, owner_id, owner_name, video_id } = await FacebookVideo.getVideoInfo(value);
			// props.onSelect({
			//   image: `http://graph.facebook.com/${owner_id}/picture?type=large`,
			//   name: `${owner_name} - ${title}`,
			//   uid: owner_id,
			//   id: video_id,
			//   type: LivestreamFacebookTargetType.profile,
			// });
			// set_value('');
		} catch (e) {
			props.onError && props.onError()
		}
		set_loading(false)
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
