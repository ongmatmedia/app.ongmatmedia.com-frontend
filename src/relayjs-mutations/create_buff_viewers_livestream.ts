import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { BuffViewersLivestreamInput } from '../schema/Services/BuffViewersLivestream/BuffViewersLivestreamInput'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation createBuffViewersLivestreamMutation($input: BuffViewersLivestreamInput!){
        create_buff_viewers_livestream_task(input: $input){
            buff{
                node{
                    id, amount, note, created_time, name, uid
                }
            }
            me{
                id, balance
            } 
        }
    }
`

export const create_buff_viewers_livestream = async (input: BuffViewersLivestreamInput) => {
    await new Promise((s, r) => {
        commitMutation(RelayEnvironment, {
            mutation,
            variables: { input },
            updater: async store => {
                const list = store.get(`client:root:buff_viewers_livestream_tasks`) as RecordProxy
                const result = store.getRootField('create_buff_viewers_livestream_task') as RecordProxy
                const buff = result.getLinkedRecord('buff') as RecordProxy
                ConnectionHandler.insertEdgeAfter(list, buff)
                s()
            },
            onError: r
        })
    })
}