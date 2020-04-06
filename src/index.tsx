import 'antd/dist/antd.css'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { AUTH0_CONFIG } from './config'
import { Auth0Provider } from './context/Auth0'
import { AppWithRouter } from './screens'
import './style.css'

const AppWithHotReload = hot(() => <AppWithRouter />)

ReactDOM.render(
	<Auth0Provider
		initOptions={AUTH0_CONFIG}
		redirect_uri={window.location.origin}
		onRedirectCallback={appState => {
			createBrowserHistory().push(
				appState && appState.targetUrl
					? appState.targetUrl
					: window.location.pathname,
			)
		}}
	>
		<AppWithHotReload />
	</Auth0Provider>,
	document.getElementById('root'),
)
