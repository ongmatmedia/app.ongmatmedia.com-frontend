import { commitMutation } from "react-relay";
import { RelayEnvironment } from '../configs/relayjs'
import { LivestreamUpdateInput } from '../schema/Services/Livestream/LivestreamUpdateInput'
import graphql from 'babel-plugin-relay/macro';


const mutation = graphql`
    mutation updateLivestreamMutation($task: LivestreamUpdateInput!){
        update_livestream(task: $task){
            id
            videos{
                thumbnail_url
            },
            time,
            name,
            active,
            updated_time
        }
    }
`


export const update_livestream = async (task: LivestreamUpdateInput) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment, {
            variables: { task },
            mutation,
            onCompleted: store => {
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })