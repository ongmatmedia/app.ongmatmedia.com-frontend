import React, { ReactNode, FunctionComponent, Component, useState, useEffect } from 'react';
import { QueryRenderer } from 'react-relay';
import { GraphQLTaggedNode, fetchQuery } from 'relay-runtime';
import { RelayEnvironment } from './RelayEnvironment'

export const GraphQLWrapper = <T extends {}, P = {}>(
  query: GraphQLTaggedNode,
  variables: any,
  C: FunctionComponent<{ loading: boolean; data: T | null, error?: string } & P>,
) => (props: P) => (
  <QueryRenderer
    environment={RelayEnvironment}
    query={query as any}
    variables={variables}
    render={rs => (
      <C
        loading={rs.props == null}
        data={((rs.props as any) as T) || null}
        error={rs.error && (rs.error as any).source.errors[0].message}
        {...props}
      />
    )}
  />
);

export const SmartGrahQLQueryRenderer = <T extends {}>(props: {
  query: GraphQLTaggedNode;
  variables: any;
  render: FunctionComponent<{ loading: boolean; data: T | null, error?: string }>;
}) => (
    <QueryRenderer
      environment={RelayEnvironment}
      query={props.query as any}
      variables={props.variables}
      render={rs => (
        <props.render
          loading={rs.props == null}
          data={((rs.props as any) as T) || null}
          error={rs.error && (rs.error as any).source.errors[0].message}
        />
      )}
    />
  );


export const LazyGrahQLQueryRenderer = <T extends {}>(props: {
  query: GraphQLTaggedNode
  render: FunctionComponent<{ loading: boolean; data: T | null, fetch: Function, error?: string }>
}) => {
  const [variables, set_variables] = useState<any>(null)

  if (variables == null) return <props.render
    loading={false}
    data={null}
    fetch={set_variables}
  />

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={props.query as any}
      variables={variables}
      render={rs => (
        <props.render
          loading={rs.props == null && !rs.error}
          data={((rs.props as any) as T) || null}
          fetch={set_variables}
          error={rs.error && (rs.error as any).source.errors[0].message}
        />
      )}
    />
  );
}

export const GraphQLQueryFetcher = async  <T extends {}>(query: GraphQLTaggedNode, variables: any) => {
  try {
    return (await fetchQuery(RelayEnvironment, query, variables)) as T;
  } catch (e) {  
    throw (e as any).errors[0].message
  }
};