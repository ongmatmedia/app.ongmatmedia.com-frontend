import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import graphql from 'babel-plugin-relay/macro'
import { VIPViewersLivestreamInput } from './__generated__/createVipViewersLivestreamMutation.graphql'
import { RelayEnvironment } from './RelayEnvironment'
import {GraphQLError} from './GraphqlError'

const mutation = graphql`
	mutation createVipViewersLivestreamMutation(
		$days: Int!
		$input: VIPViewersLivestreamInput!
	) {
		create_vip_viewers_livestream_task(days: $days, input: $input) {
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

export const create_vip_viewers_livestream = async (
	days: number,
	input: VIPViewersLivestreamInput,
) => {
	await new Promise((resolve, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { days, input },
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
