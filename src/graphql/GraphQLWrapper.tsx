import React, { FunctionComponent, useState, useEffect } from 'react'
import {
	createPaginationContainer,
	QueryRenderer,
	RefetchOptions,
	RelayPaginationProp,
} from 'react-relay'
import { fetchQuery, GraphQLTaggedNode } from 'relay-runtime'
import { RelayEnvironment } from './RelayEnvironment'

export const GraphQLWrapper = <T extends {}, P = {}>(
	query: GraphQLTaggedNode,
	variables: any,
	C: FunctionComponent<
		{ loading: boolean; data: T | null; error?: string } & P
	>,
) => (props: P) => (
	<QueryRenderer
		environment={RelayEnvironment}
		query={query as any}
		variables={variables}
		render={rs => (
			<C
				loading={rs.props == null}
				data={((rs.props as any) as T) || null}
				error={rs.error && JSON.stringify(rs.error)}
				{...props}
			/>
		)}
	/>
)

export const SmartGrahQLQueryRenderer = <T extends {}>(props: {
	query: GraphQLTaggedNode
	variables: any
	render: FunctionComponent<{
		loading: boolean
		data: T | null
		error?: string
	}>
}) => (
	<QueryRenderer
		environment={RelayEnvironment}
		query={props.query as any}
		variables={props.variables}
		render={rs => (
			<props.render
				loading={rs.props == null}
				data={((rs.props as any) as T) || null}
				error={rs.error && JSON.stringify(rs.error)}
			/>
		)}
	/>
)

export const LazyGrahQLQueryRenderer = <T extends {}>(props: {
	query: GraphQLTaggedNode
	render: FunctionComponent<{
		loading: boolean
		data: T | null
		fetch: Function
		error?: string
	}>
}) => {
	const [variables, set_variables] = useState<any>(null)

	if (variables == null)
		return <props.render loading={false} data={null} fetch={set_variables} />

	return (
		<QueryRenderer
			environment={RelayEnvironment}
			query={props.query as any}
			variables={variables}
			render={rs => {
				console.log(rs)
				return (
					<props.render
						loading={rs.props == null && !rs.error}
						data={((rs.props as any) as T) || null}
						fetch={set_variables}
						error={rs.error && JSON.stringify(rs.error)}
					/>
				)
			}}
		/>
	)
}

export const GraphQLQueryFetcher = async <T extends {}>(
	query: GraphQLTaggedNode,
	variables: any,
) => {
	try {
		return (await fetchQuery(RelayEnvironment, query, variables)) as T
	} catch (e) {
		throw JSON.stringify(e)
	}
}

type GraphQLWrapperProps<T> = {
	data?: T
	error?: string
}

type PaginationComponentProps<T, P> = P &
	GraphQLWrapperProps<T> & {
		has_more: () => boolean
		reload: (variables: any) => any
		loading: boolean
		loading_more: boolean
		load_more: (amount: number, options?: RefetchOptions) => Promise<void>
		relay: RelayPaginationProp
	}

export const PaginationWrapper = <T extends {}, P = {}>(
	query: any,
	fragment: GraphQLTaggedNode,
	variables: any,
	C: FunctionComponent<PaginationComponentProps<T, P>>,
) => {
	const G = C as any
	const F = (createPaginationContainer(
		({ data, error, relay, ...rest }: PaginationComponentProps<T, P>) => {
			const [loading, set_loading] = useState<boolean>(rest.loading)
			const [loading_more, set_loading_more] = useState<boolean>(false)
			useEffect(() => set_loading(rest.loading), [rest.loading])

			return (
				<G
					{...rest}
					data={data}
					load_more={async (n, options) => {
						set_loading_more(true)
						const data = await new Promise((s, r) =>
							relay.loadMore(n, e => (e ? r(e) : s()), options),
						)
						set_loading_more(false)
						return data
					}}
					loading={loading}
					loading_more={loading_more}
					has_more={relay.hasMore}
					reload={async (variables: any) => {
						set_loading(true)
						const data = await new Promise((s, r) =>
							relay.refetchConnection(
								variables.first || 20,
								e => (e ? r(e) : s()),
								variables,
							),
						)
						set_loading(false)
						return data
					}}
					error={error}
				/>
			)
		},
		{ data: fragment as any },
		{
			query,
			getVariables: (_, { count, cursor }, fragmentVariables) => ({
				...fragmentVariables,
				first: count,
				after: cursor,
			}),
		},
	) as any) as FunctionComponent<GraphQLWrapperProps<T>>
	return GraphQLWrapper<T, P>(query, variables, props => <F {...props} />)
}
