import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation sendMoneyMutation($note: String!, $amount: Int!, $user_id: String!){
        send_money(note: $note, amount: $amount, user_id: $user_id){
            time
            total
            receiver_username
            receiver_id
            balance_after
            note
        }
    }
`
export const send_money = (note: string, amount: number, user_id: string, receiver_amount: number) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment as any, {

            variables: { note, amount, user_id },
            mutation,
            updater: store => {
                const receiver_id = (store.getRootField('send_money') as RecordProxy).getValue('receiver_id') as string
                (window as any).a = store;
                (store.get(receiver_id) as RecordProxy).setValue(receiver_amount, 'balance')
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })