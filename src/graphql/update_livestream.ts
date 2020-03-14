import { commitMutation } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { LivestreamUpdateInput } from '../types'

const mutation = graphql`
	mutation updateLivestreamMutation($task: LivestreamUpdateInput!) {
		update_livestream(task: $task) {
			id
			videos {
				title
				is_livestream
				video_id
				thumbnail_url
				url
			}
			times
			name
			active
			updated_time
			user_id
		}
	}
`

export const update_livestream = async (task: LivestreamUpdateInput) =>
	new Promise(async (success: Function, reject: Function) => {
		commitMutation(RelayEnvironment as any, {
			variables: { task },
			mutation,
			onCompleted: store => {
				success()
			},
			onError: error => {
				reject(error)
			},
		})
	})
