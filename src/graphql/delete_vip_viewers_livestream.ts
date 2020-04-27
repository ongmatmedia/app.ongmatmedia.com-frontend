import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import graphql from 'babel-plugin-relay/macro'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation deleteVipViewersLivestreamMutation($id: String!) {
		delete_vip_viewers_livestream_task(id: $id) {
			vip {
				node {
					id
				}
			}
			me {
				id
				balance
			}
		}
	}
`

export const delete_vip_viewers_livestream = async (id: string) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { id },
			updater: async store => {
				const list = store.get(
					`client:root:vip_viewers_livestream_tasks`,
				) as RecordProxy
				ConnectionHandler.deleteNode(list, id)
				s()
			},
			onError: r,
		})
	})
}
