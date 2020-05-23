import Card from 'antd/lib/card'
import graphql from 'babel-plugin-relay/macro'
import React, { useEffect, useState } from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import {
	GraphQLQueryFetcher,
	GraphQLWrapper,
} from '../../../graphql/GraphQLWrapper'
import {
	LivestreamSubscription,
	LivestreamSubscriptionInput,
	User,
	LivestreamPricing,
	LivestreamSubscriptionUpdateResponse,
} from '../../../types'
import './style.css'
import { useAuth0 } from '../../../context/Auth0'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { update_livestream_subscription } from '../../../graphql/update_livestream_subscription'
import Alert from 'antd/lib/alert'
import * as _ from 'lodash'
import { notification, Typography } from 'antd'
import Icon from 'antd/lib/icon'
import history from '../../../helpers/history'

const subscriptions = [
	{
		name: 'basic',
		quality: 480,
	},
	{
		name: 'pro',
		quality: 720,
	},
	{
		name: 'premium',
		quality: 1080,
	},
]

const livestreamNums = [2, 7, 15, 30, 45, 60]

const querySubscription = graphql`
	query LivestreamPricingPageSubscriptionQuery {
		livestream_subscription {
			user_id
			quality
			livestream_nums
			livestream_used_nums
			name
		}
	}
`

const queryMe = graphql`
	query LivestreamPricingPageMeQuery {
		me {
			pricing {
				livestream {
					p480
					p720
					p1080
				}
			}
		}
	}
`

export const PricingPage = () => {
	const { user } = useAuth0()
	const [activeSubscription, setActiveSubscription] = useState<string>('')

	const [showPeriods, setShowPeriods] = useState<boolean>(false)

	const [selectedNums, setSelectedNums] = useState<number | null>(null)

	const [selectedSubscription, setSelectedSubscription] = useState<
		LivestreamSubscriptionInput
	>()

	const [
		livestreamPricingFromSystem,
		setLivestreamPricingFromSystem,
	] = useState<LivestreamPricing>()

	const [error, setError] = useState<any | null>()

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fn = async () => {
			const {
				livestream_subscription: { name },
			} = await GraphQLQueryFetcher<{
				livestream_subscription: LivestreamSubscription
			}>(querySubscription, { user_id: user.sub })
			setActiveSubscription(name)
		}
		if (user?.sub) fn()
	}, [user])

	useEffect(() => {
		const fn = async () => {
			const {
				me: {
					pricing: { livestream },
				},
			} = await GraphQLQueryFetcher<{ me: User }>(queryMe, {})
			setLivestreamPricingFromSystem(livestream)
		}
		fn()
	}, [user])

	const signUpSubscription = async () => {
		if (
			subscriptions.some(
				subscription =>
					_.isEqual(subscription, selectedSubscription) &&
					livestreamNums.includes(selectedNums),
			)
		) {
			setError(null)
			setLoading(true)
			try {
				await update_livestream_subscription(
					selectedSubscription,
					selectedNums,
					user.sub,
				)
				notification.success({
					message: 'Operation: Sign up subscription',
					description: 'Successfully',
				})
				history.push('/livestream')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else setError('Invalid subscription. Please submit again!')
	}

	return (
		<Card
			title={<BreadCrumb />}
			bodyStyle={{ padding: 0, margin: 0 }}
			style={{ minHeight: '100%' }}
		>
			{error && <Alert showIcon type="error" message={error} />}
			<div className="background">
				<div className="container">
					<div className="panel pricing-table">
						{subscriptions.map(({ name, quality }) => (
							<div
								className={
									name == activeSubscription
										? 'pricing-plan active'
										: 'pricing-plan'
								}
							>
								<img
									src={
										name == 'basic'
											? 'https://s22.postimg.cc/8mv5gn7w1/paper-plane.png'
											: name == 'pro'
											? 'https://s28.postimg.cc/ju5bnc3x9/plane.png'
											: name == 'premium'
											? 'https://s21.postimg.cc/tpm0cge4n/space-ship.png'
											: ''
									}
									alt=""
									className="pricing-img"
								/>
								<h2 className="pricing-header">{name.toLocaleUpperCase()}</h2>
								<ul className="pricing-features">
									<li className="pricing-features-item">{`${quality} p`}</li>
									<li className="pricing-features-item">
										Unlimited concurrent and repeat numbers
									</li>
								</ul>
								{selectedSubscription?.name !== name && (
									<span
										className="pricing-button"
										style={{ cursor: 'pointer' }}
										onClick={() => {
											setSelectedSubscription({
												name,
												quality,
											})
											setShowPeriods(true)
											setSelectedNums(null)
										}}
									>
										{name == activeSubscription ? 'Renew' : 'Choose'}
									</span>
								)}
								{showPeriods && selectedSubscription?.name == name && (
									<Row gutter={16}>
										{livestreamNums.map(num => (
											<Col xs={8}>
												<Button
													style={{ margin: 5 }}
													type={num == selectedNums ? 'primary' : 'dashed'}
													onClick={() => setSelectedNums(num)}
												>
													{num}
												</Button>
											</Col>
										))}
									</Row>
								)}
								{selectedNums && selectedSubscription?.name == name && (
									<div>
										<Divider />
										<span className="pricing-price">
											{`${
												selectedSubscription?.name == 'basic'
													? (
															livestreamPricingFromSystem.p480 * selectedNums
													  ).toLocaleString('vi-VN')
													: selectedSubscription?.name == 'pro'
													? (
															livestreamPricingFromSystem.p720 * selectedNums
													  ).toLocaleString('vi-VN')
													: selectedSubscription?.name == 'premium'
													? (
															livestreamPricingFromSystem.p1080 * selectedNums
													  ).toLocaleString('vi-VN')
													: NaN
											}`}
										</span>
										<span className="pricing-price__currency"> VND</span>
									</div>
								)}
								{selectedNums && selectedSubscription.name == name && (
									<div
										className="pricing-button"
										style={{ cursor: 'pointer' }}
										onClick={() => signUpSubscription()}
									>
										Sign up
										{loading && (
											<Icon
												type="loading"
												style={{ marginLeft: 15, fontSize: 20 }}
											/>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	)
}
