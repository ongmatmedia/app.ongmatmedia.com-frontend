import React, { Component } from "react";
import { QueryRenderer, GraphQLTaggedNode } from "react-relay";


export type GraphQLConnection<T> = {
    edges: Array<{ node: T }>,
    pageInfo: { next_token: string | null }
}

export type LoadmoreFunction = (variables: any, force: boolean) => any

export type LoadMoreContainerRenderProps<T> = {
    error: Error | null,
    prevVariables: any,
    loading: boolean,
    loadingMore: boolean,
    data: GraphQLConnection<T>,
    load_more: LoadmoreFunction
}

export type LoadMoreContainerProps<T> = {
    environment: any,
    query: GraphQLTaggedNode,
    variables: any,
    render: (props: LoadMoreContainerRenderProps<T>) => React.ReactNode

}

export type LoadMoreContainerState = {
    variables: any
}


export class LoadMoreContainer<T> extends Component<LoadMoreContainerProps<T>, LoadMoreContainerState>{
    private force = true
    private data: GraphQLConnection<T> = { edges: [], pageInfo: { next_token: null } }

    state: LoadMoreContainerState = {
        variables: this.props.variables
    }

    private fetch_more: LoadmoreFunction = (variables: any, force: boolean) => {
        console.log('Reload with new variables', variables)
        if (!this.data.pageInfo.next_token && !force) return
        this.force = force
        if (force) {
            this.data = { edges: [], pageInfo: { next_token: null } }
        }
        this.setState({ ... this.state, variables })
    }

    render() {
        return (
            <QueryRenderer
                environment={this.props.environment}
                variables={this.state.variables}
                query={this.props.query}
                render={rs => {
                    if (rs.props) {
                        const new_data = (rs.props as any)[Object.keys((rs.props as any))[0]] as GraphQLConnection<T>
                        this.data = {
                            edges: [... this.data.edges, ...new_data.edges],
                            pageInfo: new_data.pageInfo
                        }
                    }

                    return this.props.render({
                        prevVariables: this.state.variables,
                        data: this.data,
                        error: rs.error,
                        load_more: this.fetch_more,
                        loading: rs.props == null && this.force,
                        loadingMore: rs.props == null && !this.force
                    })
                }}

            />
        )
    }
}

