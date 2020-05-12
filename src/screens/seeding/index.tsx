import React from 'react'
import { ListAppBlock } from '../../components/common/ListAppBlock'

export const SeedingPage = () => (
	<ListAppBlock
		children={[
			{
				icon: 'eye',
				serviceName: 'Buff viewers livestream',
				link: '/buff-viewers-livestream',
			},
			{
				icon: 'rise',
				serviceName: 'Vip viewers livestream',
				link: '/vip-viewers-livestream',
			},
			{
				icon: 'audit',
				serviceName: 'View video (comming soon)',
				link: '/view',
			},
			{
				icon: 'like',
				serviceName: 'Like (comming soon)',
				link: '/like',
			},
			{
				icon: 'message',
				serviceName: 'Comment (comming soon)',
				link: '/comment',
			},
		]}
	/>
)
