import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppWithRouter } from './screens';
import 'antd/dist/antd.css'
import './style.css'
import { AppState } from './store/App';

const AppWithHotReload = hot(() => <AppWithRouter />)
 


AppState.init().then(() => {
    ReactDOM.render(
        <AppWithHotReload />,
        document.getElementById('root'),
    )
})
