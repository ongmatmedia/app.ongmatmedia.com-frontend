import React, { ReactNode, FunctionComponent, Component } from 'react'
import { QueryRenderer } from 'react-relay'
import { GraphQLTaggedNode } from 'relay-runtime'
import { RelayEnvironment } from '../configs/relayjs'


export const GraphQLWrapper = <T extends {}>(
    query: GraphQLTaggedNode,
    variables: any,
    C: FunctionComponent<{ loading: boolean, data: T | null }>
) => () => (
    <QueryRenderer
        environment={RelayEnvironment}
        query={query as any}
        variables={variables}
        render={
            rs => <C loading={rs.props == null} data={rs.props as any as T || null} />
        }
    />
) 