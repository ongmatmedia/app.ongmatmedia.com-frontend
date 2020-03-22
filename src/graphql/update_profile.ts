import { commitMutation } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { UserUpdateInput } from '../types'
import { GraphQLError } from './GraphqlError'

const mutation = graphql`
	mutation updateProfileMutation($input: UserUpdateInput!) {
		update_profile(input: $input) {
      id
      payment_methods {
        name
        owner
        account
        description
      }
		}
	}
`

export const update_profile = async (input: UserUpdateInput) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { input },
			mutation,
			onCompleted: store => {
				success()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
