import React, { ReactNode, FunctionComponent, Component } from 'react';
import { QueryRenderer } from 'react-relay';
import { GraphQLTaggedNode, fetchQuery } from 'relay-runtime';
import { RelayEnvironment } from './RelayEnvironment'

export const GraphQLWrapper = <T extends {}, P = {}>(
  query: GraphQLTaggedNode,
  variables: any,
  C: FunctionComponent<{ loading: boolean; data: T | null } & P>,
) => (props: P) => (
  <QueryRenderer
    environment={RelayEnvironment}
    query={query as any}
    variables={variables}
    render={rs => (
      <C loading={rs.props == null} data={((rs.props as any) as T) || null} {...props} />
    )}
  />
);

export const SmartGrahQLQueryRenderer = <T extends {}>(props: {
  query: GraphQLTaggedNode;
  variables: any;
  render: FunctionComponent<{ loading: boolean; data: T | null }>;
}) => (
    <QueryRenderer
      environment={RelayEnvironment}
      query={props.query as any}
      variables={props.variables}
      render={rs => (
        <props.render loading={rs.props == null} data={((rs.props as any) as T) || null} />
      )}
    />
  );

export const GraphqlQueryFetcher = async  <T extends {}>(query: GraphQLTaggedNode, variables: any) => {
  return (await fetchQuery(RelayEnvironment, query, variables)) as T;
};