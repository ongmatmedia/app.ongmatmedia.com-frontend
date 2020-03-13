import { API } from './API';
import { LivestreamVideo } from '../types';


export class Video {
  static async getVideoInfo(
    video_url: string,
  ): Promise<LivestreamVideo & { owner_name: string; owner_id: string }> {
    const data = await API.get<LivestreamVideo>('api/livestream/get-video-info', { video_url });
    return { ...data, url: video_url } as any;
  }
}
