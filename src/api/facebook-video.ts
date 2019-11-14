import { BetaAPIService } from './BetaAPIService'

import { LivestreamVideo } from '../schema/Services/Livestream/LivestreamVideo'

export class FacebookVideo {
    static async getVideoInfo(url: string): Promise<LivestreamVideo & { owner_name: string, owner_id: string }> {
        const data = await BetaAPIService.get<LivestreamVideo>('api/viewers-livestream/get-live-video-info', { url })
        return { ...data, url } as any
    }
}