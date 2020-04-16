import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import { LivestreamInput } from '../types'
import { RelayEnvironment } from './RelayEnvironment'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation createLivestreamMutation($task: LivestreamInput!) {
		create_livestream(task: $task) {
			node {
				id
				videos {
					thumbnail_url
				}
				times
				name
				active
				created_time
			}
		}
	}
`

export const create_livestream = async (task: LivestreamInput) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { task },
			mutation,
			updater: store => {
				success()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
