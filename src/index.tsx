import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { AppWithRouter } from './screens'
import { AppState } from './store/App'
import './style.css'

const AppWithHotReload = hot(() => <AppWithRouter />)

AppState.init().then(() =>
	ReactDOM.render(<AppWithHotReload />, document.getElementById('root')),
)
