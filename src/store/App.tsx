import React, { FunctionComponent, PropsWithChildren, Component } from 'react'
import { observable } from 'mobx'
import Amplify, { Auth } from 'aws-amplify'
import { GraphQLSubscription } from '../graphql/subscriptions'
import {
	FirebaseConfigVAPIDKEY,
	FirebaseConfig,
	AmplifyConfig,
} from '../config'
import * as firebase from 'firebase/app'
import { app } from 'firebase'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import * as lang from '../locales'
import {
	Redirect,
	Route,
	withRouter,
	RouteComponentProps,
} from 'react-router-dom'
import { isMobileDevice, toggleFullScreen } from '../helpers/utils'

class App {
	@observable authenticated: boolean = false
	private firebase: app.App

	async init() {
		Amplify.configure(AmplifyConfig)
		await GraphQLSubscription.subscriblePublicEvents()
		const user = await Auth.currentUserInfo()
		if (user) this.authenticated = true

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
			if (isMobileDevice()) toggleFullScreen()
			this.authenticated = true
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
		this.authenticated = false
		localStorage.setItem('login_redirect', '/')
		Auth.signOut()
		await GraphQLSubscription.unsubscribeAll()
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
	C: FunctionComponent<P & App>,
) => props => <C {...props} {...AppState} />

export const ProtectedRoute = withRouter(
	withAppState(({ authenticated, ...rest }) => {
		if (!authenticated) {
			localStorage.setItem('login_redirect', (rest as any).path)
			return <Redirect to="/auth/login" />
		}
		return <Route {...rest} render={p => <Component {...p} />} />
	}),
)
