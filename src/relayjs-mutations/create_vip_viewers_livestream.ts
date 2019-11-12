import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { VIPViewersLivestreamInput } from '../schema/Services/VIPViewersLivestream/VIPViewersLivestreamInput'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation createVipViewersLivestreamMutation($input: VIPViewersLivestreamInput!){
        create_vip_viewers_livestream_task(input: $input){
            vip{
                node{
                    id, active, amount, note, created_time, end_time, updated_time, name, groups{uid,name,image}
                }
            }
            me{
                id, balance
            } 
        }
    }
`

export const create_vip_viewers_livestream = async (input: VIPViewersLivestreamInput) => {
    await new Promise((s, r) => {
        commitMutation(RelayEnvironment, {
            mutation,
            variables: { input },
            updater: async store => {
                const list = store.get(`client:root:vip_viewers_livestream_tasks`) as RecordProxy
                const result = store.getRootField('create_vip_viewers_livestream_task') as RecordProxy
                const vip = result.getLinkedRecord('vip') as RecordProxy
                ConnectionHandler.insertEdgeAfter(list, vip)
                s()
            },
            onError: r
        })
    })
}