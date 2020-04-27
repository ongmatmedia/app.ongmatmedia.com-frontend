import { commitMutation } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import { VIPViewersLivestreamUpdateInput } from './__generated__/updateVipViewersLivestreamMutation.graphql'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation updateVipViewersLivestreamMutation(
		$input: VIPViewersLivestreamUpdateInput!
	) {
		update_vip_viewers_livestream_task(input: $input) {
			vip {
				node {
					id
					active
					amount
					bought_mins
					used_mins
					note
					name
					created_time
					updated_time
					auto_disable_after
					parallel
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
	input: VIPViewersLivestreamUpdateInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { input },
			updater: async store => s(),
			onError: r,
		})
	})
}
