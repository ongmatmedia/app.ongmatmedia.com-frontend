import { hot } from 'react-hot-loader/root';
import React from 'react';
import Amplify from "aws-amplify";
import { AmplifyConfig } from './configs/amplify'

Amplify.configure(AmplifyConfig);
 

import { AppWithRouter } from './routes';
export const App = hot(() => <AppWithRouter />)

