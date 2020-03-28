import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import { AUTH0_CONFIG } from '../config'

export class Auth0Service {
	private static client: Auth0Client

	static async getAccessToken() {
		if (this.client) {
			const access_token = (await this.client.getIdTokenClaims()) as {
				__raw: string
			}
			return access_token.__raw
		}
	}

	static async login() {
		if (this.client) {
			const user = await this.client.getUser()
			if (user) return
		}
		this.client = await createAuth0Client(AUTH0_CONFIG)
		if (window.location.href.includes('code=')) {
			await this.client.handleRedirectCallback()
			window.history.pushState({}, document.title, '/')
		} else {
			throw await this.client.loginWithRedirect()
		}
	}

	static async logout() {
		if (this.client) throw 'Auth0 service does not exist'
		else this.client.logout()
	}
}
