import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import { BuffViewersLivestreamInput } from '../types'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation createBuffViewersLivestreamMutation(
		$delay: Int!,
		$input: BuffViewersLivestreamInput!
	) {
		create_buff_viewers_livestream_task(delay: $delay, input: $input) {
			buff {
				node {
					id
					user_id
					uid
					status
					name
					note
					amount
					created_time
					end_time
					limit_mins
					last_reported_viewers
					first_reported_viewers
					orders {
						from
						amount
						time
						limit_mins
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

export const create_buff_viewers_livestream = async (
	delay: number,
	input: BuffViewersLivestreamInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { delay, input },
			updater: async store => {
				const list = store.get(
					'client:root:__BuffViewersLivestreamList_buff_viewers_livestream_tasks_connection',
				)
				try {
					const node = store
						.getRootField('create_buff_viewers_livestream_task')
						.getLinkedRecord('buff')
					node.setValue(input.id, 'id')
					ConnectionHandler.insertEdgeAfter(list, node)
				} catch (e) {
					console.log(e)
				}
				s()
			},
			onError: error => {
				console.log(error)
				r(JSON.stringify(error))
			},
		})
	})
}
