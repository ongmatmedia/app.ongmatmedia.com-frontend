import React from 'react'
import { ListAppBlock } from '../../components/common/ListAppBlock'

export const LivestreamPage = () => {
	return (
		<ListAppBlock
			children={[
				{
					icon: 'ordered-list',
					link: '/all-livestreams',
					serviceName: 'All livestreams',
				},
				{
					icon: 'plus',
					link: '/create-livestream',
					serviceName: 'Create a livestream ',
				},
			]}
		/>
	)
}
