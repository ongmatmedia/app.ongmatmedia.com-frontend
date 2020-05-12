import React from 'react'
import { ListAppBlock } from '../../components/common/ListAppBlock'

export const AccountScreen = () => (
	<ListAppBlock
		children={[
			{
				icon: 'facebook',
				link: '/facebook',
				serviceName: 'Facebook',
			},
		]}
	/>
)
