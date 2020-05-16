import { commitMutation } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import { NewDepositInfo } from '../types'
import { GraphQLError } from './GraphqlError'
import { RelayEnvironment } from './RelayEnvironment'

const mutation = graphql`
	mutation createDepositMutation($amount: Int!) {
		create_deposit(amount: $amount) {
			qrdata
			qrcode
			time
		}
	}
`

export const create_deposit = async (amount: number) => {
	return new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { amount },
			mutation,
			onCompleted: r => success((r as any).create_deposit),
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[${e.errorType}] ${e.message}`).join('\n'))
			},
		})
	}) as Promise<NewDepositInfo>
}
