import * as qs from 'query-string'

export class FacebookGraphAPI {
	constructor(private access_token: string) {}

	async get<T>(uri: string, query: any = {}): Promise<T> {
		const url = `https://graph.facebook.com${uri}?${qs.stringify({
			...query,
			access_token: this.access_token,
		})}`
		const response = await fetch(url)
		const data = await response.json()
		return data as T
	}
}
