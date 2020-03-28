import Amplify, { Auth } from 'aws-amplify'
import * as firebase from 'firebase/app'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component, FunctionComponent } from 'react'
import { initReactI18next } from 'react-i18next'
import { Route, withRouter } from 'react-router-dom'
import {
	FirebaseConfig,
	FirebaseConfigVAPIDKEY,
	AmplifyConfig,
} from '../config'
import { GraphQLSubscription } from '../graphql/subscriptions'
import { Auth0Service } from '../helpers/Auth0'
import { isMobileDevice, toggleFullScreen } from '../helpers/utils'
import * as lang from '../locales'

class App {
	@observable logged: boolean = false

	private firebase: firebase.app.App

	async init() {
		await Amplify.configure(AmplifyConfig)
		await Auth0Service.login()
		await this.on_login_success()

		// Load title
		const splited_hostname = window.location.hostname.split('.')
		const title = splited_hostname.sort((a, b) => b.length - a.length)[0]
		window.document.title = title.charAt(0).toUpperCase() + title.slice(1)

		// Load i18n
		await i18next
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
	}

	async on_login_success() {
		try {
			this.logged = true
			if (isMobileDevice()) toggleFullScreen()
			await GraphQLSubscription.subscriblePrivateEvents()
			// Enable push
			if (Notification.permission == 'granted') {
				if (!this.firebase)
					this.firebase = firebase.initializeApp(FirebaseConfig)
				const FirebaseMessaging = this.firebase.messaging()
				FirebaseMessaging.usePublicVapidKey(FirebaseConfigVAPIDKEY)
				console.log({ token: await FirebaseMessaging.getToken() })
			}
		} catch (error) {
			console.error(error)
		}
	}

	async logout() {
		this.logged = false
		await Auth0Service.logout()
	}

	async service_worker_register() {
		if (!('serviceWorker' in navigator && 'PushManager' in window))
			return console.error('Push messaging is not supported')
		await new Promise((s, r) =>
			Notification.requestPermission(state => (state == 'granted' ? s() : r())),
		).catch(e => console.log('Please enable notification'))
		const sw = await navigator.serviceWorker.register('/sw.js')
		firebase.messaging().useServiceWorker(sw)
	}
}

export const AppState = new App()

export const withAppState = <P extends {}>(
	C: FunctionComponent<P & { appState: App }>,
) => {
	const X = observer(C)
	return props => <X {...props} appState={AppState} />
}

export const ProtectedRoute = (DefaultComponent: any) =>
	withRouter(
		withAppState(({ appState, ...rest }) => {
			if (!appState.logged) return DefaultComponent
			return <Route {...rest} render={p => <Component {...p} />} />
		}),
	)
