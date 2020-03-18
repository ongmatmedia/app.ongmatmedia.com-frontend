import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { API, graphqlOperation } from 'aws-amplify'

function fetchQuery(operation, variables) {
	return API.graphql(graphqlOperation(operation.text, variables))
}

function subscribe(operation, variables) {
	const data = API.graphql(graphqlOperation(operation.text, variables)) as any
	console.log(data)
	return data.map(({ value }) => value)
}

export const RelayEnvironment = new Environment({
	network: Network.create(fetchQuery as any, subscribe),
	store: new Store(new RecordSource()),
}) as any
