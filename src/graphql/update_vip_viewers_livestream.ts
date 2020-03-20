import { commitMutation } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { VipViewersLivestreamUpdateInput } from '../types'
import { GraphQLError } from './GraphqlError'

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
	input: VipViewersLivestreamUpdateInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { input },
			updater: async store => s(),
			onError: error => {
				const { errors } = error as any as GraphQLError
				r(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			}
		})
	})
}
