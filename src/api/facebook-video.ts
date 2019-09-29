import { BetaAPIService } from './BetaAPIService'

import { LivestreamVideo } from '../schema/Services/Livestream/LivestreamVideo'

export class FacebookVideo {
    static async getVideoInfo(video_url: string): Promise<LivestreamVideo> {
        const data = await BetaAPIService.get<LivestreamVideo>('/livestream/get-video-info', { video_url })
        return { ...data, url: video_url }
    }
}