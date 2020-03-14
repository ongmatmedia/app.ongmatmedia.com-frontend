import graphql from 'babel-plugin-relay/macro';
import { requestSubscription } from 'react-relay';
import { RelayEnvironment } from '../RelayEnvironment';
import { RecordSourceSelectorProxy, SelectorData } from 'relay-runtime';

const subscription = graphql`
    subscription onUpdateLivestreamSubscription($user_id: String!){
      on_update_livestream(user_id: $user_id){
        id
        status
        user_id
        videos {
          title
          is_livestream
          video_id
          url
        }
      }
    }
  `;


export const listen_for_update_livestream = async (user_id: string) => requestSubscription(RelayEnvironment, {
  subscription,
  variables: { user_id },
  onNext: onNextData => console.log({ onNextData }),
  updater: (store: RecordSourceSelectorProxy, data: SelectorData) => console.log({ store }, { data }),
  onError: onErrorData => console.error({ onErrorData })
}); 