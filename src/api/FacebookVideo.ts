import { API } from './API'
import { LivestreamVideo } from '../types'

export class FacebookVideo {
	static async getVideoInfo(
		url: string,
	): Promise<LivestreamVideo & { owner_name: string; owner_id: string }> {
		const data = await API.get<LivestreamVideo>(
			'api/viewers-livestream/get-live-video-info',
			{
				url,
			},
		)
		return { ...data, url } as any
	}
}
