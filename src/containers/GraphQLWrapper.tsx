import React, { ReactNode } from 'react'
import { QueryRenderer } from 'react-relay'
import { GraphQLTaggedNode } from 'relay-runtime'
import { RelayEnvironment } from '../configs/relayjs'


export const GraphQLWrapper = <T extends {}>(query: GraphQLTaggedNode, variables: any, render: (loading: boolean, data: T | null) => ReactNode) => (
    <QueryRenderer
        environment={RelayEnvironment}
        query={query as any}
        variables={variables}
        render={
            rs => render(rs.props == null, (rs.props ? rs.props : {}) as T)
        }
    />
)