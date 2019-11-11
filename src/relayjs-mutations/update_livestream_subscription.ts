import { LivestreamSubscriptionInput } from '../schema/Services/Livestream/LivestreamSubscriptionInput'
import graphql from 'babel-plugin-relay/macro';
import { RelayEnvironment } from '../configs/relayjs'
import { commitMutation, ConnectionHandler, RecordProxy } from 'relay-runtime';

const mutation = graphql`
    mutation updateLivestreamSubscriptionMutation($days: Int!, $data: LivestreamSubscriptionInput!, $user_id: ID){
        update_livestream_subscription(days: $days, data: $data, user_id: $user_id){
            livestream_subscription{
                id
                user_id
                quality
                concurrent_limit
                end_time
                playing
            }
            me{
                id 
                balance
            }
            payment_history{
                node{
                    id
                    time
                    total
                    receiver_username
                    receiver_id
                    balance_after
                    note
                }
            }
        }
    }
`

export const update_livestream_subscription = (sub: LivestreamSubscriptionInput, days: number, user_id?: string) => new Promise((s, reject) => {
    commitMutation(RelayEnvironment, {
        mutation,
        variables: {
            days,
            data: sub,
            user_id
        },
        updater: store => {
            s()
        },
        onError: reject
    })
})