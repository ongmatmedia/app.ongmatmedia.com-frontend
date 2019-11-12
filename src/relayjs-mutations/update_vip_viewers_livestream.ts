import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { VIPViewersLivestreamUpdateInput } from '../schema/Services/VIPViewersLivestream/VIPViewersLivestreamUpdateInput'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation updateVipViewersLivestreamMutation($input: VIPViewersLivestreamUpdateInput!){
        update_vip_viewers_livestream_task(input: $input){
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

export const update_vip_viewers_livestream = async (input: VIPViewersLivestreamUpdateInput) => {
    await new Promise((s, r) => {
        commitMutation(RelayEnvironment, {
            mutation,
            variables: { input },
            updater: async store => s(),
            onError: r
        })
    })
}