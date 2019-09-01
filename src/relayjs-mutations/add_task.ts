import { commitMutation } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'
import { update_balance } from './effects/update-balance'
const graphql = require('babel-plugin-relay/macro');


const mutation = graphql`
    mutation addTaskMutation($task: TaskInput!){
        add_task(task: $task){
           node{
            __typename
            ... on VIPBuffViewersLivestreamTask{
                uid, amount,name,id,active,active_groups,groups,note,created_time,end_time
            }

            ... on BuffViewersLivestreamTask{
                id,note,uid,created_time,amount
            }
           }
        }
    }
`


export const add_task = async <T>(type: string, task: T) => new Promise(
    async (success: Function, reject: Function
) => {

    commitMutation(RelayEnvironment, {
        variables: { task: { [type] : task } },
        mutation,
        updater: store => {
            const list = store.get(`client:root:tasks(type:"${type}")`)
            const new_task = store.getRootField('add_task')
            list && new_task && ConnectionHandler.insertEdgeAfter(list, new_task)
            update_balance()
            success()
        },
        onError: (error) => {
            reject(error)
        }
    })
})