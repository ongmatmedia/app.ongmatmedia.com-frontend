import React from 'react'
import { Avatar } from 'antd'
import { AvatarProps } from 'antd/lib/avatar'

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
