import React from 'react'
const graphql = require('babel-plugin-relay/macro');
import { GraphQLWrapper } from '../../containers/GraphQLWrapper'
import { UserConnection } from '../../schema/User/UserConnection'
import { Spin } from 'antd'

const query = graphql`
    query AgencyListQuery{
        users{
            edges{
            node{
                username
                id
                balance
                price_percent
                created_at
            }
            }
        }
    }
`
export const AgencyList = () => GraphQLWrapper<{users: UserConnection}>(query, {}, (loading, data) => {
    if(loading) return <Spin />

    return (
        <span>
            {
                JSON.stringify(data)
            }
        </span>
    )
})