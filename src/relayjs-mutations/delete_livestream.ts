import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordSourceProxy, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';


const mutation = graphql`
    mutation deleteLivestreamMutation($id: ID!){
        delete_livestream(id: $id)
    }
`

const share_updater = (store, id: string) => {
    const list = store.get(`client:root:livestream_tasks`) as RecordProxy
    ConnectionHandler.deleteNode(list, id)
}

export const delete_livestream = async (id: string) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment as any, {
            variables: { id },
            mutation,
            optimisticUpdater: store => share_updater(store, id),
            updater: store => {
                share_updater(store, id)
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })
