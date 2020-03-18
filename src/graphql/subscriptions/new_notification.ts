import { RelayEnvironment } from '../RelayEnvironment'
import graphql from 'babel-plugin-relay/macro'
import { requestSubscription } from 'react-relay'

const subscription = graphql`
	subscription newNotificationSubscription($user_id: String!) {
		on_new_notification(user_id: $user_id) {
			id
			user_id
			icon
			title
			body
			ref
		}
	}
`

export const listen_for_new_notification = async () =>
	requestSubscription(RelayEnvironment, {
		subscription,
		variables: { user_id: 'all' },
		onNext: console.log,
		updater: console.log,
		onError: console.error,
	})
