import { BetaAPIService } from './BetaAPIService'


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

}