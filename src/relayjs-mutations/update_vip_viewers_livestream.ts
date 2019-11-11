import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { VIPViewersLivestreamInput } from '../schema/Services/VIPViewersLivestream/VIPViewersLivestreamInput'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation updateVipViewersLivestreamMutation($input: VIPViewersLivestreamInput!){
        update_vip_viewers_livestream_task(input: $input){
            vip{
                node{
                    id, amount, note, created_time, end_time, updated_time, name, groups{uid,name,image}
                }
            }
            me{
                id, balance
            } 
        }
    }
`

export const update_vip_viewers_livestream = async (input: VIPViewersLivestreamInput) => {
    await new Promise((s, r) => {
        commitMutation(RelayEnvironment, {
            mutation,
            variables: { input },
            updater: async store => s(),
            onError: r
        })
    })
}