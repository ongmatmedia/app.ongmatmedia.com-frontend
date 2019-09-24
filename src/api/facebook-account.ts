import axios, { AxiosResponse } from 'axios'
import { API_ENDPOINT } from '../configs/api';


export type FacebookAccountInfo = {
    user_id: string
    access_token: string
    name: string
}

export class FacebookAccount {
    static async getCookieInfo(cookie: string): Promise<FacebookAccountInfo> {
        const rs = await axios.post<any, AxiosResponse<{ accounts: FacebookAccountInfo[] }>>(
            API_ENDPOINT + '/account/fromCookie',
            { cookies: [cookie] }
        )
        return rs.data.accounts[0]
    }
}