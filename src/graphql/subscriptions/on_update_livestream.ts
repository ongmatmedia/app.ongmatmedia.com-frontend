import graphql from 'babel-plugin-relay/macro';
import { requestSubscription } from 'react-relay';
import { RelayEnvironment } from '../RelayEnvironment';

const subscription = graphql`
    subscription onUpdateLivestreamSubscription($user_id: String!){
      on_update_livestream(user_id: $user_id){
        status
        videos {
          title
          is_livestream
          video_id
          thumbnail_url
          url
        }
      }
    }
  `;


export const listen_for_update_livestream = async (user_id: string) => requestSubscription(RelayEnvironment, {
  subscription,
  variables: { user_id },
  onNext: onNextData => console.log({ onNextData }),
  updater: updaterData => console.log({ updaterData }),
  onError: onErrorData => console.error({ onErrorData })
}); 