import graphql from 'babel-plugin-relay/macro'
import { requestSubscription } from 'react-relay'
import { RelayEnvironment } from '../RelayEnvironment'
import { RecordSourceSelectorProxy, SelectorData } from 'relay-runtime'

const subscription = graphql`
	subscription onUpdateBuffViewersLivestreamPlayingSubscription {
		on_update_buff_viewers_livestream_playing {
			edges {
				node {
					status
					id
				}
			}
		}
	}
`

export const on_update_buff_viewers_livestream_playing = () =>
	requestSubscription(RelayEnvironment, {
		subscription,
		variables: {},
		onNext: onNextData => console.log({ onNextData }),
		updater: (store: RecordSourceSelectorProxy, data: SelectorData) =>
			console.log({ store }, { data }),
		onError: onErrorData => console.error({ onErrorData }),
	})
