import graphql from 'babel-plugin-relay/macro'
import { RelayEnvironment } from './RelayEnvironment'
import { commitMutation, ConnectionHandler, RecordProxy } from 'relay-runtime'
import { LivestreamSubscriptionInput } from '../types'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation updateLivestreamSubscriptionMutation(
		$bought: Int!
		$data: LivestreamSubscriptionInput!
		$user_id: ID
	) {
		update_livestream_subscription(
			bought: $bought
			data: $data
			user_id: $user_id
		) {
			livestream_subscription {
				user_id
				quality
				livestream_nums
				livestream_used_nums
				name
			}
			me {
				id
				balance
			}
			payment_history {
				node {
					id
					time
					total
					receiver_username
					receiver_id
					balance_after
					note
				}
			}
		}
	}
`

export const update_livestream_subscription = (
	sub: LivestreamSubscriptionInput,
	bought: number,
	user_id?: string,
) =>
	new Promise((s, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: {
				bought,
				data: sub,
				user_id,
			},
			updater: store => {
				s()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
