import { hot } from 'react-hot-loader/root';
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyConfig } from './config';
import './i18n';

Amplify.configure(AmplifyConfig);

import { AppWithRouter } from './screens';

export const App = hot(() => <AppWithRouter />);
