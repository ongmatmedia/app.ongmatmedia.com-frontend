import {FBCURL} from './FBCURL'

export type Friend = {
	uid: string
	name: string
	reactions: number
	comment: number
	inbox: number
	sex: string
	friend_count: number
	hometown: string
	mutual_friends: number
	pokeUrl?: string
}

export class FBFriend
{
	constructor (private client: FBCURL) {}

	async list_friends (): Promise<Map<string, Friend>>
	{
		const friends = new Map<string, Friend>()
		for (let index = 0, after = ''; index <= 5000; index += 500)
		{
			const q = `node(${this.client.user_id}){friends.first(500).after(${after}){page_info,edges{cursor, node{id,mutual_friends{count},hometown, name,gender,friends{count}}}}}`
			const data = await this.client.postForm<{
				[uid: string]: {
					friends: {
						page_info: {
							start_cursor: string
							has_next_page: boolean
							end_cursor: string
							delta_cursor: string
						}
						edges: Array<{
							cursor: string
							node: {
								id: string
								mutual_friends: {count: number}
								name: string
								gender: string
								friends: {count: number}
								hometown: {name: string}
							}
						}>
					}
				}
			}>('https://www.facebook.com/api/graphql', {q})
			const {
				friends: {edges, page_info},
			} = data[Object.keys(data)[0]]
			edges.map(({node}) =>
				friends.set(node.id, {
					comment: 0,
					friend_count: node.friends.count,
					inbox: 0,
					hometown: node.hometown ? node.hometown.name : '',
					name: node.name,
					mutual_friends: node.mutual_friends.count,
					reactions: 0,
					sex: node.gender,
					uid: node.id,
				}),
			)
			if (!page_info.has_next_page) break
			after = edges[edges.length - 1].cursor
		}
		return friends
	}

	async remove_friend (friend_id: string)
	{
		await this.client.post('https://mbasic.facebook.com/a/removefriend.php', {
			friend_id,
			unref: 'profile_gear',
			confirm: 'Xác nhận',
		})
	}

	async getPokeQuery (friend_name: string, friend_uid: string)
	{
		const {
			data,
		} = await this.client.get(
			'https://mbasic.facebook.com/pokes/friend_search',
			{query: friend_name},
		) as {data: string}
		const regex = new RegExp(
			`\\/pokes\\/inline\\/\\?dom_id_replace=\\w_\\d_\\w&amp;is_hide=\\d&amp;poke_target=${friend_uid}.*hash=[^\\s"]+`,
			'gm',
		)
		if (!data.match(regex)) throw 'Error while fetching html'
		const rawUrl = data.match(regex)[0].replace(/&amp;/gm, '&')
		const query = {
			dom_id_replace: rawUrl.match(/dom_id_replace=([^&]+)/)[1],
			is_hide: rawUrl.match(/is_hide=([^&]+)/)[1],
			poke_target: rawUrl.match(/poke_target=([^&]+)/)[1],
			redirect_url: '/pokes/',
			ext: rawUrl.match(/ext=([^&]+)/)[1],
			hash: rawUrl.match(/hash=([^&\s]+)/)[1],
		}
		return query
	}

	async pokeFriend (pokeUrl: string)
	{
		await this.client.get(pokeUrl)
	}
}
