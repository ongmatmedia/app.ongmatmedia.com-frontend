/* eslint-disable @typescript-eslint/no-empty-function */
import createAuth0Client, {
	Auth0Client,
	Auth0ClientOptions,
	LogoutOptions,
	RedirectLoginOptions,
} from '@auth0/auth0-spa-js'
import Amplify from 'aws-amplify'
import i18next from 'i18next'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { initReactI18next } from 'react-i18next'
import { AmplifyConfig, GraphQLEndpoint } from '../config'
import * as lang from '../locales'

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname)

const defaultAuth0Context = {
	isAuthenticated: false,
	user: { picture: '', sub: '' },
	loading: true,
	popupOpen: false,
	loginWithPopup: () => {},
	handleRedirectCallback: () => {},
	getIdTokenClaims: () => {},
	loginWithRedirect: async (options: RedirectLoginOptions) => {},
	getTokenSilently: () => {},
	getTokenWithPopup: () => {},
	logout: (options: LogoutOptions) => {},
	auth0Client: null,
	userToken: null,
}

interface Auth0ProviderProps {
	children: any
	onRedirectCallback?: Function
	initOptions: Auth0ClientOptions
	redirect_uri?: string
}

export const Auth0Context = createContext(defaultAuth0Context)
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = (props: Auth0ProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [user, setUser] = useState<any>()
	const [auth0Client, setAuth0] = useState<Auth0Client>()
	const [loading, setLoading] = useState<boolean>(true)
	const [popupOpen, setPopupOpen] = useState<boolean>(false)
	const [userToken, setUserToken] = useState<string>()

	const initI18n = async () => {
		await i18next.use(initReactI18next).init({
			fallbackLng: 'en',
			debug: false,
			interpolation: {
				escapeValue: false,
			},
			resources: lang,
		})
	}

	const configureAmplify = async (token: string) => {
		if (token) {
			try {
				Amplify.configure({
					...AmplifyConfig,
					API: {
						graphql_endpoint: GraphQLEndpoint,
						graphql_headers: () => {
							return {
								authorization: token,
							}
						},
					},
				})
			} catch (error) {
				console.error(error)
			}
		} else {
			throw 'No Auth0 client'
		}
	}

	const initTitleForCurrentUser = () => {
		const splited_hostname = window.location.hostname.split('.')
		const title = splited_hostname.sort((a, b) => b.length - a.length)[0]
		window.document.title = title.charAt(0).toUpperCase() + title.slice(1)
	}

	useEffect(() => {
		const initAuth0 = async () => {
			const auth0FromHook = await createAuth0Client(props.initOptions)
			setAuth0(auth0FromHook)

			if (
				window.location.search.includes('code=') &&
				window.location.search.includes('state=')
			) {
				const { appState } = await auth0FromHook.handleRedirectCallback()
				props.onRedirectCallback
					? props.onRedirectCallback(appState)
					: DEFAULT_REDIRECT_CALLBACK()
			}

			const isAuthenticated = await auth0FromHook.isAuthenticated()

			setIsAuthenticated(isAuthenticated)

			if (isAuthenticated) {
				const user = await auth0FromHook.getUser()
				const token = await auth0FromHook.getIdTokenClaims()
				configureAmplify(token.__raw)
				setUserToken(token.__raw)
				setUser(user)
				await initI18n()
				initTitleForCurrentUser()
			}
			setLoading(false)
		}
		initAuth0()
	}, [userToken])

	const loginWithPopup = async (params = {}) => {
		setPopupOpen(true)
		try {
			await auth0Client.loginWithPopup(params)
		} catch (error) {
			console.error(error)
		} finally {
			setPopupOpen(false)
		}
		const user = await auth0Client.getUser()
		setIsAuthenticated(true)
		setUser(user)
		await initI18n()
		initTitleForCurrentUser()
	}

	const handleRedirectCallback = async () => {
		setLoading(true)
		await auth0Client.handleRedirectCallback()
		const user = await auth0Client.getUser()
		setLoading(false)
		setIsAuthenticated(true)
		setUser(user)
		await initI18n()
		initTitleForCurrentUser()
	}

	return (
		<Auth0Context.Provider
			value={{
				isAuthenticated,
				user,
				loading,
				popupOpen,
				loginWithPopup,
				handleRedirectCallback,
				getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
				loginWithRedirect: async options =>
					await auth0Client.loginWithRedirect(options),
				getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
				getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
				logout: (...p) => auth0Client.logout(...p),
				auth0Client,
				userToken,
			}}
		>
			{props.children}
		</Auth0Context.Provider>
	)
}
