import { Auth0ClientOptions } from '@auth0/auth0-spa-js'

export const GraphQLEndpoint =
	'https://7qwdnah2rbbopjl5cgj7w5jgqe.appsync-api.us-east-1.amazonaws.com/graphql'

export const API_GATEWAY ='https://1s71m8djfk.execute-api.us-east-1.amazonaws.com'

export const AmplifyConfig = {
	aws_appsync_graphqlEndpoint: GraphQLEndpoint,
	aws_appsync_region: 'us-east-1',
	aws_appsync_authenticationType: 'OPENID_CONNECT',
	Analytics: {
		disabled: true,
	},
	API: {
		graphql_endpoint: GraphQLEndpoint,
	},
}

export const FirebaseConfig = {
	apiKey: 'AIzaSyA1DPukkSEaW9z61Sdf33gF0h6GbqfBXG4',
	authDomain: 'ongmatmedia-bdb50.firebaseapp.com',
	databaseURL: 'https://ongmatmedia-bdb50.firebaseio.com',
	projectId: 'ongmatmedia-bdb50',
	storageBucket: 'ongmatmedia-bdb50.appspot.com',
	messagingSenderId: '626079383120',
	appId: '1:626079383120:web:0f1a66ef4bb0492d7f1b55',
	measurementId: 'G-EV9FXMXP0J',
}

export const FirebaseConfigVAPIDKEY =
	'BHTar4YMvOMDzZOqKW8j-ThYbvqvPfCnBfOUzN8QI1fIvHM5rQETDFWXEffWFxZXyly4lTBNtgwf5TqZEp0gDUE'

export const AUTH0_CONFIG: Auth0ClientOptions = {
	domain: 'josbatpnyosimkjhcaigcdysojd.auth0.com',
	client_id: 'ULu1nczmxux4oXuHi709h9x8dkGaVf4f',
	cacheLocation: 'localstorage',
	redirect_uri: window.location.origin,
}
