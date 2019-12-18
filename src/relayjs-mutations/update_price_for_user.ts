import { commitMutation } from "react-relay";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';
import { ServicePricing } from '../schema/User/ServicePricing'

const mutation = graphql`
    mutation updatePriceForUserMutation($user_id: String!, $price_percent: Int!,$price: ServicePricingInput! ){
        update_price_for_user(user_id: $user_id, price_percent: $price_percent, price: $price ){
            node{
                id,
                price_percent, 
                balance, 
                pricing{
                        buff_viewers_livestream
                        vip_viewers_livestream
                        livestream{
                        p480
                        p720
                        p1080
                    }
                }
            }
        }
    }
`
export const update_price_for_user = (user_id: string, price_percent: number, pricing: ServicePricing) => new Promise(
    async (success: Function, reject: Function
    ) => {
        commitMutation(RelayEnvironment as any, {

            variables: { user_id, price_percent, pricing },
            mutation,
            updater: store => {
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })