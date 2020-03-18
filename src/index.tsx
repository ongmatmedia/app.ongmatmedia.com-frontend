<<<<<<< HEAD
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
=======
import { App } from './App'
import 'antd/dist/antd.css'
import './style.css'
App.init()
>>>>>>> 0341275fef166bce46dd7905582e25a5e6f06614
