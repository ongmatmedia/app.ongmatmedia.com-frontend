import Avatar, { AvatarProps } from 'antd/lib/avatar'
import React from 'react'

export type FacebookAvatarProps = AvatarProps & { uid: string }

export const FacebookAvatar = (props: FacebookAvatarProps) => (
	<span
		style={{ cursor: 'pointer' }}
		onClick={() => window.open('https://fb.com/' + props.uid)}
	>
		<Avatar
			src={`http://graph.facebook.com/${props.uid}/picture?type=large`}
			{...props}
		/>
	</span>
)
