import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation stopLivestreamMutation($id: ID!) {
		stop_livestream(id: $id) {
			id
			status
			updated_time
			user_id
		}
	}
`

export const stop_livestream = async (id: string) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { id },
			mutation,
			optimisticUpdater: store => {
				success()
			},
			onError: error => {
				reject(error)
			},
		})
	})
