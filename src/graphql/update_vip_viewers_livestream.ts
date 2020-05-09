import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import { GraphQLError } from './GraphqlError'
import { RelayEnvironment } from './RelayEnvironment'
import { VIPViewersLivestreamUpdateInput } from './__generated__/updateVipViewersLivestreamMutation.graphql'

const mutation = graphql`
	mutation updateVipViewersLivestreamMutation(
		$livestream_nums: Int!
		$input: VIPViewersLivestreamUpdateInput!
		$id: String!
	) {
		update_vip_viewers_livestream_task(
			livestream_nums: $livestream_nums
			input: $input
			id: $id
		) {
			vip {
				node {
					id
					active
					name
					amount
					max_duration
					livestream_nums
					livestream_used_nums
					created_at
					payment_history {
						created_at
						amount
						max_duration
						bought
						price
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

export const update_vip_viewers_livestream = async (
	livestream_nums: number,
	input: VIPViewersLivestreamUpdateInput,
	id: string,
) => {
	await new Promise((resolve, reject) => {
		commitMutation(RelayEnvironment, {
			mutation,
			variables: { livestream_nums, input, id },
			onCompleted: resolve,
			onError: error => {
				const { errors } = (error as any) as GraphQLError
				reject(errors.map(e => `[ERROR] ${e.message}`).join('\n'))
			},
		})
	})
}
