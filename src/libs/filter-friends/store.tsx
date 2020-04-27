import React from 'react'
import {observer, IReactComponent} from 'mobx-react'
import {observable} from 'mobx'
import {notification} from 'antd'
import {Friend, FBFriend} from './FBFriend'
import {FBCURL} from './FBCURL'
import {FBMessage} from './FBMessage'
import {ReactionScan} from './ReactionScan'
import {AsyncEachBlock} from '../../helpers/ArrayLoop'
import {sleep} from '../../helpers/utils'

export const REMOVING_FRIEND = Symbol.for('REMOVING_FRIEND')

export class FilterFriendsStore
{
	@observable public friends: Map<string, Friend> = new Map()
	@observable public loading_status: string | null = null
	@observable public error: string | null = null
	@observable public deleted_friend: Friend | null = null
	@observable public poked_friend: Friend | null = null
	@observable public loading_percent: number = 0
	@observable public selected_friends: Friend[] | null = []
	@observable public selectedRowKeys: number[] | string[] = []
	@observable public search_name: string = ''

	private client: FBCURL | null = null

	constructor () {}

	async delete_friends (friends: Friend[], sleep_second: number)
	{
		this.loading_status = 'delete_friends'

		if (this.client)
		{
			const friend_client = new FBFriend(this.client)
			for (const [index, friend] of Object.entries(friends))
			{
				; (this.friends.get(`${friend.uid}`) as any)[REMOVING_FRIEND] = true
				await friend_client.remove_friend(friend.uid)
				this.deleted_friend = friend
				this.loading_percent = Math.ceil(
					((Number(index) + 1) / friends.length) * 100,
				)
				this.friends.delete(`${friend.uid}`)
				notification.success({
					message: `Deleted ${friend.uid} ${friend.name}`,
				})
				const time =
					sleep_second >= 0
						? sleep_second * 1000
						: Math.ceil(Math.random() * 10000) + 5000
				Number(index) + 1 < friends.length &&
					(await new Promise(S => setTimeout(S, time)))
			}
		} else
		{
			this.error = 'INVAILD COOKIE'
		}
		this.loading_status = null
		this.deleted_friend = null
	}

	async delete_friend (friend: Friend)
	{
		if (this.client)
		{
			const friend_client = new FBFriend(this.client)
			this.deleted_friend = friend
			this.friends.delete(`${friend.uid}`)
			notification.success({message: `Deleted ${friend.uid} ${friend.name}`})
			try
			{
				await friend_client.remove_friend(friend.uid)
			} catch (e)
			{
				this.error = 'INVAILD COOKIE'
			}
			this.loading_status = null
			this.deleted_friend = null
		}
	}

	async poke_friend (friend: Friend)
	{
		if (this.client)
		{
			const friend_client = new FBFriend(this.client)
			this.poked_friend = friend
			try
			{
				const baseUrl = "https://mbasic.facebook.com/pokes/inline/"
				const pokeQuery = await friend_client.getPokeQuery(friend.name, friend.uid)
				await this.client.get(baseUrl, pokeQuery)
				notification.success({message: `Poked ${friend.uid} ${friend.name}`})
				this.poked_friend = null
			} catch (e)
			{
				console.log(e)
				this.error = 'INVAILD COOKIE'
			}
		}
	}

	async poke_friends (friends: Friend[], sleep_second: number)
	{
		if (this.client)
		{
			const friend_client = new FBFriend(this.client)
			const baseUrl = "https://mbasic.facebook.com/pokes/inline/"
			try
			{
				AsyncEachBlock(friends, 50, async (friend, index) =>
				{
					this.poked_friend = friend
					const pokeQuery = await friend_client.getPokeQuery(friend.name, friend.uid)
					await this.client.get(baseUrl, pokeQuery)
					this.loading_percent = Math.ceil(
						((Number(index) + 1) / friends.length) * 100,
					)
					notification.success({message: `Poked ${friend.uid} ${friend.name}`})
					this.poked_friend = null
					Number(index) + 1 < friends.length && await sleep(sleep_second)
				})
			} catch (error)
			{
				console.log(error)
				this.error = 'INVAILD COOKIE'
			}
		}
		this.selected_friends = []
	}

	async load (cookie: string, limit: number)
	{
		try
		{
			this.friends = new Map()
			this.error = null
			this.deleted_friend = null
			this.loading_percent = 0
			this.loading_status = 'get_access_token'
			const fb = await FBCURL.fromCookie(cookie)

			this.client = fb

			this.loading_status = 'friends'
			await this.load_friends(fb)

			this.loading_status = 'inbox'
			await this.load_inbox(fb)

			this.loading_status = 'reactions'
			await this.scan_reaction(fb, limit)

			this.loading_status = null
		} catch (e)
		{
			this.error = e.message
			this.loading_status = null
		}
	}

	async getAllFriends (cookie: string)
	{
		try
		{
			this.friends = new Map()
			this.error = null
			this.loading_percent = 0
			this.loading_status = 'get_access_token'
			const fb = await FBCURL.fromCookie(cookie)

			this.client = fb

			this.loading_status = 'friends'
			await this.load_friends(fb)

			this.loading_status = null
		} catch (e)
		{
			this.error = e.message
			this.loading_status = null
		}
	}

	async load_friends (fb: FBCURL)
	{
		this.loading_status = 'friends'
		const client = new FBFriend(fb)
		this.friends = await client.list_friends()
	}

	async load_inbox (acc: FBCURL)
	{
		const client = new FBMessage(acc)
		this.loading_percent = 10
		let last_time = Date.now()
		const messages = await client.load_messages(200, last_time)
		const inbox_statics = await client.get_messages_count()
		for (const [uid, messages_count] of inbox_statics)
		{
			if (this.friends.has(uid))
			{
				; (this.friends.get(uid) as Friend).inbox = messages_count
			} else
			{
				// console.log('Not have ' + uid)
			}
		}
	}

	async scan_reaction (acc: FBCURL, n: number)
	{
		const client = new ReactionScan(acc)
		let after = ''
		let total = 0
		this.loading_percent = 0
		while (true)
		{
			const data = await client.scan(Math.min(100, n - total), after)
			after = data.page_info.end_cursor
			total += data.edges.length
			this.loading_percent = Math.ceil((total / n) * 100)
			for (const edge of data.edges)
			{
				if (edge.node.feedback)
				{
					const {commenters, reactors} = edge.node.feedback
					for (const {id} of commenters.nodes)
						this.friends.has(`${id}`) &&
							(this.friends.get(`${id}`) as Friend).comment++
					for (const {id} of reactors.nodes)
						this.friends.has(`${id}`) &&
							(this.friends.get(`${id}`) as Friend).reactions++
				}
			}

			if (!data.page_info.has_next_page || total >= n) break
		}
	}
}

const store = new FilterFriendsStore()

export const withFilterFriendsStore = <T extends {}> (
	target: IReactComponent<T & {store: FilterFriendsStore}>,
) =>
{
	const C = observer(target)
	return (props: T) => <C {...props} store={store} />
}
