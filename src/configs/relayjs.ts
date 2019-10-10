
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import { Auth } from "aws-amplify";
import { Modal } from 'antd';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';

const cache = new RelayQueryResponseCache({ size: 250, ttl: 300 * 1000 });
const GraphQLEndpoint = 'https://7qwdnah2rbbopjl5cgj7w5jgqe.appsync-api.us-east-1.amazonaws.com/graphql'

async function query(operation, variables, cacheConfig?: any) {
    const queryID = operation.text;
    const isMutation = operation.operationKind === 'mutation';
    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;


    // Try to get data from cache on queries
    const fromCache = cache.get(queryID, variables);
    if (
        isQuery &&
        fromCache !== null &&
        !forceFetch
    ) {
        return fromCache;
    }


    try {
        const user = await Auth.currentSession()
        const response = await fetch(GraphQLEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.getAccessToken().getJwtToken()
            },
            body: JSON.stringify({
                operationName: operation.name,
                query: operation.text,
                variables,
            })
        })
        const data = await response.json()

        if (isQuery) {
            cache.set(queryID, variables, data);
        }
        if (isMutation) {
            cache.clear();
        }
        return data
    } catch (e) {
        Modal.error({
            title: 'Error with API, do you want to login?',
            onOk: () => {
                Auth.signOut()
                window.location.href = '#/auth/login'
            }
        })
    }

}

export const RelayEnvironment = new Environment({
    network: Network.create(query),
    store: new Store(new RecordSource())
}) as any