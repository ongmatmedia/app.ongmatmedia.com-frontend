import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
const graphql = require('babel-plugin-relay/macro');


const mutation = graphql`
    mutation deleteFacebookAccountMutation($id: ID!){
        delete_facebook_account(id: $id)
    }
`


export const delete_facebook_account = async (id: string) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment, {
            variables: { id },
            mutation,
            optimisticUpdater: store => {
                const list = store.get(`client:root:facebook_accounts`) as RecordProxy
                const edges = list.getLinkedRecords('edges') as RecordProxy[]
                for (const edge of edges) {
                    const node = edge.getLinkedRecord('node') as RecordProxy
                    if (node.getValue('id') == id) node.setValue(null, 'name')
                }
            },
            updater: store => {
                const list = store.get(`client:root:facebook_accounts`) as RecordProxy
                ConnectionHandler.deleteNode(list, id)
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })