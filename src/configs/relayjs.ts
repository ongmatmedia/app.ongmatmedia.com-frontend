
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import { Auth } from "aws-amplify";
import { Modal } from 'antd';

const GraphQLEndpoint = 'https://7qwdnah2rbbopjl5cgj7w5jgqe.appsync-api.us-east-1.amazonaws.com/graphql'

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
    store: new Store(new RecordSource()),
}); 