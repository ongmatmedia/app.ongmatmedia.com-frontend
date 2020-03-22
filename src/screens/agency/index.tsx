import React from 'react'
import { ListAppBlock } from '../../components/common/ListAppBlock'

export const AgencyPage = () => (
	<ListAppBlock
		children={[
			{
				icon: 'user',
				link: '/collaborators',
				serviceName: 'Collaborators',
			},
			{
				icon: 'bank',
				link: '/bank-information',
				serviceName: 'Bank information ',
			},
			{
				icon: 'dollar',
				link: '/default-price',
				serviceName: 'Default price',
			},
			{
				icon: 'contacts',
				link: '/admin-information',
				serviceName: 'Admin',
			},
			{
				icon: 'file-protect',
				link: '/report',
				serviceName: 'Report',
			},
			{
				icon: 'setting',
				link: '/setting',
				serviceName: 'Settings',
			},
		]}
	/>
)
