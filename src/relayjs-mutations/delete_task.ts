import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordSourceProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
const graphql = require('babel-plugin-relay/macro');


const mutation = graphql`
    mutation deleteTaskMutation($id: ID!){
        delete_task(id: $id){
            __typename
        }
    }
`
const share_updater = (store: RecordSourceProxy, type: string, id: string) => {
    const list = store.get(`client:root:tasks(type:"${type}")`)
    list && ConnectionHandler.deleteNode(list, id)
}

export const delete_task = async (id: string,type: string) => new Promise(
    async (success: Function, reject: Function
) => {

    commitMutation(RelayEnvironment, {
        variables: { id},
        mutation,
        updater: store => {
            share_updater(store, type,id)
            success()
        },
        optimisticUpdater: store => {
            share_updater(store, type,id)
        },
        onError: (error) => {
            reject(error)
        }
    })
})