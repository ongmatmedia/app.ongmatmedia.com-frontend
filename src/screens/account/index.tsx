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
			{
				cover:
					'https://aromaincense.id/wp-content/uploads/2018/10/shopee-icon-png-5.png',
				link: '/shopee',
				serviceName: 'Shopee',
			},
		]}
	/>
)
