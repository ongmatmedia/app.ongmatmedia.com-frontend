import { commitMutation } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { update_balance } from "./effects/update-balance";
const graphql = require('babel-plugin-relay/macro');


const mutation = graphql`
    mutation updateTaskMutation($task: TaskUpdateInput!){
        update_task(task: $task){
            __typename
            ... on VIPBuffViewersLivestreamTask{
                uid,id,amount,created_time,end_time,name,active,note,active_groups,groups
            }
        }
    }
`


export const update_task = async <T>(type: string, task: T) => new Promise(
    async (success: Function, reject: Function
    ) => {
 

        commitMutation(RelayEnvironment, {
            variables: { task: { [type]: task } },
            mutation,
            onCompleted: () => {
                update_balance()
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })