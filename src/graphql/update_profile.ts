import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { UserUpdateInput } from '../types'
import { GraphQLError } from './GraphqlError'
import { RelayEnvironment } from './RelayEnvironment'
import { commitLocalUpdate } from 'relay-runtime'

const mutation = graphql`
	mutation updateProfileMutation($input: UserUpdateInput!) {
		update_profile(input: $input) {
			node {
				id
      	payment_methods {
        name
        owner
        account
        description
      }
			}
		}
	}
`

export const update_profile = async (input: UserUpdateInput) =>
	new Promise(async (success: Function, reject: Function) => {

		commitMutation(RelayEnvironment as any, {
			variables: { input },
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
