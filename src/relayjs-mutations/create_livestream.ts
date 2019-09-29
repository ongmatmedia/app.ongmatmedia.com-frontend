import React from 'react'
import { commitMutation } from "react-relay";
import { ConnectionHandler, RecordProxy } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs' 
import {LivestreamInput} from '../schema/Services/Livestream/LivestreamInput'
import graphql from 'babel-plugin-relay/macro';


const mutation = graphql`
    mutation createLivestreamMutation($task: LivestreamInput!){
        create_livestream(task: $task){
            node{
                id,
                videos{
                    thumbnail_url
                },
                name,
                note,
                active,
                created_time
            }
        }
    }
`


export const create_livestream = async (task: LivestreamInput) => new Promise(
    async (success: Function, reject: Function
    ) => {

        commitMutation(RelayEnvironment, {
            variables: { task },
            mutation,
            updater: store => {
                const list = store.get(`client:root:livestream_tasks`) as RecordProxy
                const livestream_task = store.getRootField('create_livestream') as RecordProxy
                ConnectionHandler.insertEdgeAfter(list, livestream_task)
                success()
            },
            onError: (error) => {
                reject(error)
            }
        })
    })