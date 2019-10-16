import { LivestreamSubscriptionInput } from '../schema/Services/Livestream/LivestreamSubscriptionInput'
import graphql from 'babel-plugin-relay/macro';
import { RelayEnvironment } from '../configs/relayjs'
import { commitMutation, ConnectionHandler, RecordProxy } from 'relay-runtime';

const mutation = graphql`
    mutation updateLivestreamSubscriptionMutation($days: Int!, $data: LivestreamSubscriptionInput!, $user_id: ID){
        update_livestream_subscription(days: $days, data: $data, user_id: $user_id){
            user_id
            quality
            concurrent_limit
            end_time
            playing
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
            if (!user_id) {
                const sub = store.getRootField('update_livestream_subscription') as RecordProxy
                const old_sub = store.get('client:root:livestream_subscription') as RecordProxy
                ['quality', 'concurrent_limit', 'end_time'].map(name => old_sub.setValue(sub.getValue(name), name))
            }
            s()
        },
        onError: reject
    })
})