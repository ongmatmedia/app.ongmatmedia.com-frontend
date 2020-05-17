import {stringify} from 'query-string'
import {Extension} from './Extension'
import * as axios from 'axios'

export class FBCURL {
	constructor (
		private cookie: string,
		public user_id: string,
		public name: string,
		private fb_dtsg: string,
		public readonly eaa_token: string,
	) {}

	static async fromCookie (cookie: string) {
		// Prefight request m diabled
		try
		{
			const user_id_match = cookie.match(/c_user=([0-9]+)/)
			if (!user_id_match) throw new Error('Invaild user id')
			const user_id = user_id_match[1]
			const key = `fb-ext|${user_id}`
			chrome.runtime.sendMessage(Extension.installed, {
				action: 'set-cookie',
				key,
				value: cookie,
			})

			const htmlOcelotToken = await fetch(
				'https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed',
				{
					headers: {accept: key},
				},
			).then(x => x.text())

			const fb_dtsg_match = htmlOcelotToken.match(/fb_dtsg\\" value=\\"(.+?)\\/)

			const token_match = htmlOcelotToken.match(/(EAAA\w+)/)

			const htmlExtractUsername = await fetch(
				'https://m.facebook.com/settings/sms',
				{
					headers: {
						accept: key,
					},
				},
			).then(x => x.text())

			const name_match = htmlExtractUsername.match(/"NAME":"(.+?)"/)
			if (!name_match) throw new Error('Can not get profile name')
			console.log(htmlExtractUsername)
			const name = JSON.parse(`"${name_match[1]}"`)

			if (fb_dtsg_match && token_match)
			{
				return new this(cookie, user_id, name, fb_dtsg_match[1], token_match[1])
			}
		} catch (error)
		{
			console.log({error})
			throw new Error('Can not perform this action. Something went wrong!')
		}
	}

	async get (url: string, params: any = null) {
		const {data, status} = await axios.default({
			method: 'GET',
			url,
			params,
			headers: {
				accept: `fb-ext|${this.user_id}`,
				'Access-Control-Allow-Origin': '*',
			},
			httpsAgent:
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
		})
		return {data, status}
	}

	async post (url: string, data: any = {}, query: any = null) {
		return fetch(`${url}${query ? '?' + stringify(query) : ''}`, {
			body: stringify({
				...data,
				__a: 1,
				fb_dtsg: this.fb_dtsg,
			}),
			headers: {
				accept: `fb-ext|${this.user_id}`,
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
		})
			.then(result => result.text())
			.catch(err => err)
	}

	async postForm<T> (url: string, data: any = {}, query: any = null) {
		const rs = await this.post(url, data, query)
		try
		{
			return JSON.parse(rs) as T
		} catch (e)
		{
			return JSON.parse(rs.slice(9, rs.length)) as T
		}
	}

	async postJSON<T> (url: string, data: any = {}, query: any = {}) {
		const rs = fetch(`${url}${query ? '?' + stringify(query) : ''}`, {
			method: 'POST',
			body: JSON.stringify({
				...data,
				fb_dtsg: this.fb_dtsg,
			}),
			headers: {
				accept: `fb-ext|${this.user_id}`,
				'content-type': 'application/json',
			},
		})
		return (await (await rs).json()) as T
	}

	/* Get access token */
	public async getLivestreamAccessToken () {
		try
		{
			const qs = {
				app_id: `273465416184080`,
				target_id: this.user_id,
				enable_content_protection: false,
				is_360_broadcast: false,
				is_rehearsal: false,
				av: this.user_id,
				ajax: true,
			}
			const payload = await this.post(
				`https://www.facebook.com/create_broadcast/create`,
				{
					video_broadcast_infra_type: 'RTMP',
					__comet_req: false,
				},
				qs,
			)

			const id = JSON.parse(payload.match(/{.*}/)[0]).payload.id

			const rs2 = await this.post(
				`https://www.facebook.com/live/broadcast/dialog/?av=${this.user_id}`,
				{
					target_id: this.user_id,
					broadcast_id: id,
					container_id: '',
					composer_type: 'feedx_sprouts',
					description: '',
					place: '',
					direct_share_status: 0,
					sponsor_relationship: 0,
					__pc: 'PHASED:ufi_home_page_pkg',
				},
			)

			return rs2.match(/accessToken":"(.+?)"/)[1]
		} catch (error)
		{
			throw error
		}
	}
}
