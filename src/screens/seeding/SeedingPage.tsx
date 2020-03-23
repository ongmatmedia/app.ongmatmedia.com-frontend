import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListAppBlock } from '../../components/common/ListAppBlock'
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper'
import { User } from '../../types'

type SeedingService = {
	name: string
	icon: string
	description: React.ReactNode | string
	cover: string
	link: string
}

const query = graphql`
	query SeedingPageQuery {
		me {
			price_percent
			pricing {
				buff_viewers_livestream
				vip_viewers_livestream
				livestream {
					p480
					p720
					p1080
				}
			}
		}
	}
`

export const SeedingPage = GraphQLWrapper<{ me: User }>(query, {}, props => {
	const { t, i18n } = useTranslation('seeding_page')

	const cards = [
		{
			link: '/buff-viewers-livestream',
			cover:
				'https://cdn1.iconfinder.com/data/icons/antivirus-flat/512/signal_service_online_stream-512.png',
			serviceName: t('buff_livestream_title'),
		},
	]

	return <ListAppBlock children={cards} />
})
