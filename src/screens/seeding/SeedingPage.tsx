import { Avatar, Card, Icon, List, Tag, Breadcrumb, Divider, Row } from 'antd'
import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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

	const cards: SeedingService[] = [
		{
			cover:
				'https://techcrunch.com/wp-content/uploads/2015/08/facebook-live.png?w=730&crop=1',
			link: '/seeding/buff-viewers-livestream',
			description: (
				<span>
					{props.data && (
						<Tag color="#108ee9">
							{Math.ceil(
								props.data.me.pricing
									? props.data.me.pricing.buff_viewers_livestream
									: NaN,
							).toLocaleString()}
							<Icon
								type="dollar"
								style={{
									fontSize: 16,
									verticalAlign: '-0.2em',
									paddingLeft: 3,
									color: 'white',
								}}
							/>
						</Tag>
					)}
					{t('buff_livestream_description')}
				</span>
			),
			icon:
				'https://cdn1.iconfinder.com/data/icons/antivirus-flat/512/signal_service_online_stream-512.png',
			name: t('buff_livestream_title'),
		}
	]

	return (
		<Card style={{height: 'calc(100vh - 65px)'}} title={(
			<Breadcrumb separator=">">
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item href="/seeding">Seeding</Breadcrumb.Item>
				<Breadcrumb.Item href="/seeding/buff-viewers">Buff viewers</Breadcrumb.Item>
			</Breadcrumb>
		)}>
			<List
				grid={{
					gutter: 24,
					xs: 2,
					sm: 3,
					md: 6
				}}
				dataSource={cards}
				renderItem={item => (
					<List.Item>
						<Link to={item.link}>
							<Card style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 10, boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)' }}>
								<Row style={{ marginBottom: 15 }}>
									<Avatar src={item.icon} size={40} style={{  }} />
								</Row>
								<Row>
									{item.name}
								</Row>
							</Card>
							{/* <Card
								cover={
									<img
										src={item.cover}
										style={{ width: '100%', height: 170 }}
									/>
								}
							>
								<Card.Meta
									avatar={<Avatar src={item.icon} />}
									title={item.name}
									description={item.description}
								/>
							</Card> */}
						</Link>
					</List.Item>
				)}
			/>
		</Card>
	)
})
