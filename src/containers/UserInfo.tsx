import React, { ReactNode } from 'react'
import { User } from '../schema/User/User'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../configs/relayjs'
import graphql from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from './GraphQLWrapper'

type UserInfoProps = {
    render: (loading: boolean, user: User | null) => ReactNode
}

const query = graphql`
    query UserInfoQuery{
        me{ 
            id
            username
            balance
            price_percent
            creator_id 
            created_at
            updated_at
        }
    }
`

export const UserInfo = (props: UserInfoProps) => GraphQLWrapper<{ me: User }>(
    query,
    {},
    (loading, data) => props.render(loading, data && data.me)
)