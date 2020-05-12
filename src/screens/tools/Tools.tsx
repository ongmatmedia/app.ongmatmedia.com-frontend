import React from 'react'
import { ListAppBlock } from '../../components/common/ListAppBlock'

export const Tools = () => (
	<ListAppBlock
		children={[
			{
				icon: 'filter',
				serviceName: 'Filter friend',
				link: '/filter-friends',
			},
			{
				cover:
					'https://i2.wp.com/www.visaflux.com/wp-content/uploads/2019/09/Facebook-Pokes.jpg?resize=500%2C304&ssl=1',
				serviceName: 'Poke friend',
				link: '/poke-friends',
			},
			{
				cover:
					'https://www.zimbra.com/wp-content/uploads/2015/11/zimbra-2FA-icon.png',
				serviceName: 'Get 2FA code (comming soon)',
				link: '/get-2fa',
			},
			{
				cover:
					'https://cdn0.iconfinder.com/data/icons/user-profile-and-profile-services/100/profile-03-512.png',
				serviceName: 'Active avatar shield (comming soon)',
				link: '/active-avatar-shield',
			},
		]}
	/>
)
