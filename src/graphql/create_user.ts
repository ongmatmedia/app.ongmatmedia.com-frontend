import { commitMutation } from 'react-relay'
import { ConnectionHandler, RecordProxy } from 'relay-runtime'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation createUserMutation(
		$price_percent: Int!
		$password: String!
		$username: String!
		$email: String!
	) {
		create_user(
			price_percent: $price_percent
			password: $password
			username: $username
			email: $email
		) {
			node {
				username
				id
				balance
				price_percent
				created_at
			}
		}
	}
`
export const create_user = (
	username: string,
	password: string,
	price_percent: number,
	email: string,
) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: {
				username: username.toLowerCase(),
				password,
				price_percent,
				email,
			},
			mutation,
			updater: store => {
				const list = store.get('client:root:users') as RecordProxy
				const livestream_task = store.getRootField('create_user') as RecordProxy
				ConnectionHandler.insertEdgeAfter(list, livestream_task)
				success()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
