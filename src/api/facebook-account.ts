import { BetaAPIService } from './BetaAPIService'
import { LivestreamFacebookTargetType } from '../schema/Services/Livestream/LivestreamFacebookTargetType'


export type FacebookAccountInfo = {
    user_id: string
    access_token: string
    name: string
}

export class FacebookAccount {
    static async getCookieInfo(cookie: string): Promise<FacebookAccountInfo> {
        const data = await BetaAPIService.post<{ accounts: FacebookAccountInfo[] }>('api/account/from-cookie', { cookies: [cookie] })
        return data.accounts[0]
    }

    static async getUIDFromURL(url: string) : Promise<{uid: string, name: string, type: LivestreamFacebookTargetType}> {
        return await BetaAPIService.get('api/account/get-uid-from-url', {url})
    }

}