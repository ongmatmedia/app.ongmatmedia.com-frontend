import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import graphql from 'babel-plugin-relay/macro'
import { VIPViewersLivestreamInput } from './__generated__/createVipViewersLivestreamMutation.graphql'
import { RelayEnvironment } from './RelayEnvironment'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation createVipViewersLivestreamMutation(
		$livestream_nums: Int!
		$input: VIPViewersLivestreamInput!
	) {
		create_vip_viewers_livestream_task(
			livestream_nums: $livestream_nums
			input: $input
		) {
			vip {
				node {
					id
					active
					name
					amount
					max_duration
					livestream_nums
					livestream_used_nums
					created_at
					payment_history {
						created_at
						amount
						max_duration
						bought
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

export const create_vip_viewers_livestream = async (
	livestream_nums: number,
	input: VIPViewersLivestreamInput,
) => {
	await new Promise((resolve, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { livestream_nums, input },
			updater: async store => {
				const list = store.get(
					`client:root:vip_viewers_livestream_tasks`,
				) as RecordProxy
				const result = store.getRootField(
					'create_vip_viewers_livestream_task',
				) as RecordProxy
				const vip = result.getLinkedRecord('vip') as RecordProxy
				ConnectionHandler.insertEdgeAfter(list, vip)
				resolve()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[ERROR] ${e.message}`).join('\n'))
			},
		})
	})
}
