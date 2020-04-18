import { stringify } from 'query-string'
import { Extension } from './Extension'



export class FBCURL {

    constructor (
        private cookie: string,
        public user_id: string,
        private fb_dtsg: string,
        public readonly eaa_token: string
    ) {

    }

    static async fromCookie(cookie: string) {
        // Prefight request m diabled 
        const user_id_match = cookie.match(/c_user=([0-9]+)/)
        if (!user_id_match) throw new Error('Invaild user id')
        const user_id = user_id_match[1]
        console.log({chrome})
        chrome.runtime.sendMessage(Extension.installed, {
            action: 'set-cookie',
            key: user_id,
            value: cookie
        })

        const html = await fetch('https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed', {
            headers: { accept: user_id },
        }).then(x => x.text())
        
        const fb_dtsg_match = html.match(/fb_dtsg\\" value=\\"(.+?)\\/)
        const token_match = html.match(/(EAAA\w+)/)
        console.log({token_match})

        if (fb_dtsg_match && token_match) {
            return new this(cookie, user_id, fb_dtsg_match[1], token_match[1])
        }
        throw new Error('Invaild cookie')
    }

    async get(url: string) {
        return fetch(url, { headers: { accept: this.user_id } }).then(r => r.text())
    }

    async post(url: string, data: any = {}, query: any = null) {
        return fetch(`${url}${query ? '?' + stringify(query) : ''}`, {
            body: stringify({
                ...data,
                fb_dtsg: this.fb_dtsg,
            }),
            headers: {
                accept: this.user_id,
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        }).then(r => r.text())
    }

    async postForm<T>(url: string, data: any = {}, query: any = null){
        const rs = await this.post(url, data, query)
        try{
            return JSON.parse(rs) as T
        }catch(e){
            return JSON.parse(rs.slice(9, rs.length)) as T
        }
    }

    async postJSON<T>(url: string, data: any = {}, query: any = {}) {
        const rs = fetch(`${url}${query ? '?' + stringify(query) : ''}`, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                fb_dtsg: this.fb_dtsg,
            }),
            headers: {
                accept: this.user_id,
                'content-type': 'application/json'
            }
        })
        return await (await rs).json() as T
    }
}