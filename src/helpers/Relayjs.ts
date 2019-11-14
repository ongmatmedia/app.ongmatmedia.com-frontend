import { GraphQLTaggedNode, fetchQuery } from "relay-runtime";
import { RelayEnvironment } from '../configs/relayjs'


export const GraphqlQuery = async <T>(query: GraphQLTaggedNode, variables: any) => {
    return await fetchQuery(RelayEnvironment, query, variables) as T
}