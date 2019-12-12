import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro';
import { ServicePricing as ServicePricingInput } from '../schema/User/ServicePricing'

const mutation = graphql`
    mutation updatePricingMutation($price: ServicePricingInput!){
    update_pricing(price: $price) {
        node {
            id, pricing {
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
export const update_pricing = (price: ServicePricingInput) => new Promise(
    async (success: Function, reject: Function
    ) => {
        commitMutation(RelayEnvironment as any, {
            variables: { price },
            mutation,
            updater: store => {
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })