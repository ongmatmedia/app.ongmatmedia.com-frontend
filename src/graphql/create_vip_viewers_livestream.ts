import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { VipViewersLivestreamInput } from '../types'

const mutation = graphql`
	mutation createVipViewersLivestreamMutation(
		$input: VIPViewersLivestreamInput!
	) {
		create_vip_viewers_livestream_task(input: $input) {
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

export const create_vip_viewers_livestream = async (
	input: VipViewersLivestreamInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { input },
			updater: async store => {
				const list = store.get(
					`client:root:vip_viewers_livestream_tasks`,
				) as RecordProxy
				const result = store.getRootField(
					'create_vip_viewers_livestream_task',
				) as RecordProxy
				const vip = result.getLinkedRecord('vip') as RecordProxy
				ConnectionHandler.insertEdgeAfter(list, vip)
				s()
			},
			onError: e => r(e.message),
		})
	})
}
