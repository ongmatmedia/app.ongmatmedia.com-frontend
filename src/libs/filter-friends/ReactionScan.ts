import { FBCURL } from './FBCURL'

interface Reaction {
	id: number
	creation_time: number
	feedback?: {
		reactors: { nodes: Array<{ id: number }> }
		commenters: { nodes: Array<{ id: number }> }
	}
}

export class ReactionScan {
	constructor(private client: FBCURL) {}

	async scan(limit: number, after: string) {
		const q = `
            node(${this.client.user_id}){
                timeline_feed_units
                .first(${limit})
                .after(${after}){
                    page_info,
                    edges{
                        node{
                            id,
                            creation_time,
                            feedback{
                                reactors{
                                    nodes{id}
                                },
                                commenters{
                                    nodes{id}
                                }
                            }
                        }
                    }
                }
            }
        `
		const rs = await this.client.post('https://www.facebook.com/api/graphql', {
			q,
		})
		const data = JSON.parse(rs) as {
			[uid: string]: {
				timeline_feed_units: {
					edges: Array<{ node: Reaction }>
					page_info: {
						has_next_page: boolean
						end_cursor: string
					}
				}
			}
		}
		return data[Object.keys(data)[0]].timeline_feed_units
	}
}
