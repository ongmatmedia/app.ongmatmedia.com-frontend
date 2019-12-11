import { commitMutation } from "react-relay";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';
import { RecordProxy } from "relay-runtime";

const mutation = graphql`
    mutation updatePricePercentMutation($price_percent: Int!, $user_id: String!){
        update_price_percent(user_id: $user_id, price_percent: $price_percent ){
            node{
                username
                id
                balance
                price_percent 
            }
        }
    }
`
export const update_price_percent = (user_id: string, price_percent: number, owner_percent: number) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment as any, {

            variables: { user_id, price_percent },
            mutation,
            updater: store => {
                (store.get(user_id) as RecordProxy).setValue(owner_percent * price_percent / 100, 'price_percent')
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })