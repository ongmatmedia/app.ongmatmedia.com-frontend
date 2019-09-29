import { BetaAPIService } from './BetaAPIService'


export type FacebookAccountInfo = {
    user_id: string
    access_token: string
    name: string
}

export class FacebookAccount {
    static async getCookieInfo(cookie: string): Promise<FacebookAccountInfo> {
        const data = await BetaAPIService.get<{ accounts: FacebookAccountInfo[] }>('/account/fromCookie', { cookies: [cookie] })
        return data.accounts[0]
    }

}