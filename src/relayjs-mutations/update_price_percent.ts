import { commitMutation } from "react-relay";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
    mutation updatePricePercentMutation($price_percent: Int!, $user_id: String!){
        update_price_percent(user_id: $user_id, price_percent: $price_percent )
    }
`
export const update_price_percent = (user_id: string, price_percent: number) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment as any, {

            variables: { user_id, price_percent },
            mutation,
            updater: store => {
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })