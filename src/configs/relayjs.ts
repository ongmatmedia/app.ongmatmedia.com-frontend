
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import { Auth } from "aws-amplify";

const GraphQLEndpoint = 'https://astywsdaunes5mxcihwj4jnfzu.appsync-api.us-east-1.amazonaws.com/graphql'
 
async function query(operation, variables) {
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
        return await response.json()
    } catch (e) {
        if(['#/reset-pass','#/set-new-pass'].indexOf(window.location.hash.trim()) < 1){
            window.location.href = window.location.origin + '#login'
        }
    }

}

export const RelayEnvironment = new Environment({
    network: Network.create(query),
    store: new Store(new RecordSource()),
}); 