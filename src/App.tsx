import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Auth, Logger } from 'aws-amplify';
import { AmplifyConfig, FirebaseConfig, FirebaseConfigVAPIDKEY } from './config';
import { AppWithRouter } from './screens';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import * as lang from './locales';
import { GraphQLSubscription } from './graphql/subscriptions';
import { AppCycleHook } from './AppCycleHook';

const AppWithHotReload = hot(() => <AppWithRouter />)

export class App {


    static async init() {
        Amplify.configure(AmplifyConfig);
        AppCycleHook.register_service_worker()
        await GraphQLSubscription.subscriblePublicEvents()

        // Check login 
        if (!window.location.hash.match(/#\/auth\/([a-z]+)/) && !(await Auth.currentUserInfo())) {
            window.location.href = '/#/auth/login'
        }


        // Load title
        const title = window.location.hostname.split('.').reverse()[1];
        window.document.title = title.charAt(0).toUpperCase() + title.slice(1);

        // Load i18n
        i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                fallbackLng: 'en',
                debug: false,
                interpolation: {
                    escapeValue: false
                },
                resources: lang
            });

        // Render
        ReactDOM.render(
            <AppWithHotReload />,
            document.getElementById('root'),
        )
    }


}