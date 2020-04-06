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
				}
			}
			me {
				id
				balance
			}
		}
	}
`

export const add = () => commitLocalUpdate(RelayEnvironment, store => {
	const list = store.get('client:root:__BuffViewersLivestreamList_buff_viewers_livestream_tasks_connection')
	const edge = store.create('ahihi', 'BuffViewersLivestreamEdge')
	const node = store.create('client:root:__BuffViewersLivestreamList_buff_viewers_livestream_tasks_connection:edges:14', 'BuffViewersLivestream')
	node.setValue('1332057510316685', 'id')
	node.setValue('50', 'amount')
	node.setValue('add_from_web', 'note')
	node.setValue(1586100380216, 'created_time')
	node.setValue('Live', 'name')
	node.setLinkedRecords([], 'logs')
	node.setLinkedRecords([], 'orders')

	edge.setLinkedRecord(node, 'node')
	ConnectionHandler.insertEdgeAfter(list, edge)
})


export const create_buff_viewers_livestream = async (
	input: BuffViewersLivestreamInput,
) => {
	await new Promise((s, r) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { input },
			updater: async store => {
				if (store.get(input.id)) return s()
				const list = store.get('client:root:__BuffViewersLivestreamList_buff_viewers_livestream_tasks_connection')
				try {
					const node = store.getRootField('create_buff_viewers_livestream_task').getLinkedRecord('buff')
					console.log({ node })
					ConnectionHandler.insertEdgeAfter(list, node)
				} catch (e) {
					console.log(e)
				}
				s()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				r(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
}

