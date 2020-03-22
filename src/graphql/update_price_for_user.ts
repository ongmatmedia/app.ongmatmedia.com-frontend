import { commitMutation } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { ServicePricing } from '../types'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation updatePriceForUserMutation(
		$user_id: String!
		$price_percent: Int!
		$price: ServicePricingInput!
	) {
		update_price_for_user(
			user_id: $user_id
			price_percent: $price_percent
			price: $price
		) {
			id
			price_percent
			balance
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
export const update_price_for_user = (
	user_id: string,
	price_percent: number,
	price: ServicePricing,
) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { user_id, price_percent, price },
			mutation,
			updater: store => {
				success()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
