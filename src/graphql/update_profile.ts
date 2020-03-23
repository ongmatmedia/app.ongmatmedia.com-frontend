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
				try {
					const updated_info = store.getRootField('update_profile').getLinkedRecord('node')
					const id = updated_info.getDataID()
					const payment_methods = updated_info.getLinkedRecords('payment_methods')
					const me = store.get(id)
					me.setValue<any>(payment_methods, 'payment_methods')
				} catch (e) {
					console.log(e)
				}
				success()
			},
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	})
