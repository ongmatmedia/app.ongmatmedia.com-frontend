import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy, Store, SelectorStoreUpdater, RecordSourceSelectorProxy, commitLocalUpdate } from 'relay-runtime'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { BuffViewersLivestreamInput } from '../types'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation createBuffViewersLivestreamMutation(
		$input: BuffViewersLivestreamInput!
	) {
		create_buff_viewers_livestream_task(input: $input) {
			buff {
				node {
					id
					amount
					note
					created_time
					name
					orders{
						from
						amount
						limit_mins
						time
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
	input: BuffViewersLivestreamInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { input },
			updater: async store => { 
				const list = store.get('client:root:__BuffViewersLivestreamList_buff_viewers_livestream_tasks_connection')
				try {
					const node = store.getRootField('create_buff_viewers_livestream_task').getLinkedRecord('buff')
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

