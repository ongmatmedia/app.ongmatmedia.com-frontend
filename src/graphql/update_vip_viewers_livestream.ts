import graphql from 'babel-plugin-relay/macro'
import {commitMutation} from 'react-relay'
import {GraphQLError} from './GraphqlError'
import {RelayEnvironment} from './RelayEnvironment'
import {VIPViewersLivestreamUpdateInput} from './__generated__/updateVipViewersLivestreamMutation.graphql'

const mutation = graphql`
	mutation updateVipViewersLivestreamMutation(
		$days: Int!,
		$input: VIPViewersLivestreamUpdateInput!,
		$id: String!,
	) {
		update_vip_viewers_livestream_task(days: $days, input: $input, id: $id) {
			vip {
				node {
					id
					active
					name
					amount
					end_time
					max_duration
					max_live_per_day
					parallel
					created_time
					payment_history {
						time
						amount
						max_duration
						max_live_per_day
						parallel
						price
					}
				}
			}
			me {
				id
				balance
			}
		}
	}
`

export const update_vip_viewers_livestream = async (
	days: number,
	input: VIPViewersLivestreamUpdateInput,
	id: string
) => {
	await new Promise((resolve, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { days, input, id },
			updater: store => {
				resolve()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[ERROR] ${e.message}`).join('\n'))
			},
		})
	})
}
