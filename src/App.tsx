import Amplify from 'aws-amplify'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { initReactI18next } from 'react-i18next'
import { AppCycleHook } from './AppCycleHook'
import { AmplifyConfig } from './config'
import * as lang from './locales'
import { AppWithRouter } from './screens'

const AppWithHotReload = hot(() => <AppWithRouter />)

export class App {
	static async configure() {
		Amplify.configure(AmplifyConfig)
		AppCycleHook.register_service_worker()

		// Load i18n
		i18n
			.use(LanguageDetector)
			.use(initReactI18next)
			.init({
				fallbackLng: 'en',
				debug: false,
				interpolation: {
					escapeValue: false,
				},
				resources: lang,
			})

		// Load title
		const splited_hostname = window.location.hostname.split('.')
		const title = splited_hostname.sort((a, b) => b.length - a.length)[0]
		window.document.title = title.charAt(0).toUpperCase() + title.slice(1)
	}

	static async init() {
		try {
			this.configure()
		} catch (e) {}

		// Render
		ReactDOM.render(<AppWithHotReload />, document.getElementById('root'))
	}
}
