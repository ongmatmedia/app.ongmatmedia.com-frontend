

export class Extension {

    static installed = (window.frameElement ? window.parent.window : window as any)['__CORS_CHROME_EXTENSION_ID__']

    static async send<T>(action: string, data: any = {}) {
        return await new Promise((s, r) => chrome.runtime.sendMessage(this.installed, { action, ...data }, response => {
            if (response) s(response)
            r(response)
        })) as T
    }

    static async get_facebook_current_user(): Promise<{ uid: string, cookie: string } | null> {
        const cookie = await this.send<string>('get-facebook-cookie')
        if (!cookie) return null
        const uid_match = cookie.match(/c_user=([0-9]+)/)
        if (!uid_match) return null
        return {
            cookie,
            uid: uid_match[1]
        }
    }


}