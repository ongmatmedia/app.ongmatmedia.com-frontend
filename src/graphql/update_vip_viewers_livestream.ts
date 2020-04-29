import { commitMutation } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import { VIPViewersLivestreamUpdateInput } from './__generated__/updateVipViewersLivestreamMutation.graphql'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation updateVipViewersLivestreamMutation(
		$days: Int!
		$input: VIPViewersLivestreamUpdateInput!
	) {
		update_vip_viewers_livestream_task(days: $days, input: $input) {
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
) => {
	await new Promise((resolve, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { days, input },
			updater: async store => resolve(),
			onError: reject,
		})
	})
}
