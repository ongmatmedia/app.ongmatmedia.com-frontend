import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import { AUTH0_CONFIG } from '../config'
import { clearStorageWithRegex } from './utils'

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
		this.client = await createAuth0Client(AUTH0_CONFIG)
		try {
			const user = await this.client.getIdTokenClaims()
			return user
		} catch {
			if (
				window.location.href.includes('code=') &&
				window.location.search.includes('state=')
			) {
				await this.client.handleRedirectCallback()
				window.history.replaceState(
					{},
					document.title,
					window.location.origin + window.location.hash,
				)
				if (this.client.isAuthenticated) {
					const user = this.client.getUser()
					return user
				}
			} else {
				throw await this.client.loginWithRedirect({
					redirect_uri: window.location.origin,
				})
			}
		}
	}

	static async logout() {
		if (!this.client) throw 'Auth0 service does not exist'
		else {
			this.client.logout()
			clearStorageWithRegex('auth0spajs')
		}
	}
}
