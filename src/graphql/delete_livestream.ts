import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import { GraphQLError } from './GraphqlError'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation deleteLivestreamMutation($id: ID!) {
		delete_livestream(id: $id)
	}
`

export const delete_livestream = async (id: string) =>
	new Promise(async (resolve, reject) => {
		commitMutation(RelayEnvironment as any, {
			variables: { id },
			mutation,
			updater: store => {
				const list = store.get('client:root:livestream_tasks') as RecordProxy
				ConnectionHandler.deleteNode(list, id)
				resolve()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[ERROR] ${e.message}`).join('\n'))
			},
		})
	})
