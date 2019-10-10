import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { FacebookAccountInput } from "../schema/FacebookAccount/FacebookAccountInput";
const graphql = require('babel-plugin-relay/macro');


const mutation = graphql`
    mutation addFacebookAccountMutation($input: FacebookAccountInput!){
        add_facebook_account(input: $input){
           node{
            user_id 
            id 
            name 
            cookie 
            access_token 
            live 
            created_at 
            updated_at 
           }
        }
    }
`


export const add_facebook_account = async (account: FacebookAccountInput) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment as any, {
            variables: { input: account },
            mutation,
            updater: store => {
                const list = store.get(`client:root:facebook_accounts`) as RecordProxy
                const facebook_account = store.getRootField('add_facebook_account') as RecordProxy

                const newAccount = facebook_account.getLinkedRecord('node') as RecordProxy
                const newAccountUID = newAccount.getValue('id')

                const edges = list.getLinkedRecords('edges') as RecordProxy[]
                for (const edge of edges) {
                    const node = edge.getLinkedRecord('node') as RecordProxy
                    if (node.getValue('id') == newAccountUID) return success()
                }
                ConnectionHandler.insertEdgeAfter(list, facebook_account)
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })