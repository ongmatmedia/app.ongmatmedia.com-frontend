import { listen_for_new_notification } from "./new_notification"
import { Disposable } from "react-relay"
import { Auth } from "aws-amplify"
import { listen_for_update_livestream } from "./on_update_livestream"


export class GraphQLSubscription {


    static subscriblePublicEvents() {

    }

    private static dispose_list: Set<Disposable> = new Set()
    static async subscriblePrivateEvents() {

        // Get current user
        const user = await Auth.currentUserInfo()
        const user_id = user.attributes.sub

        // Active private events
        this.unsubscribeAll()
        this.dispose_list.add(await listen_for_new_notification())
        this.dispose_list.add(await listen_for_update_livestream(user_id))
    }

    static unsubscribeAll() {
        for (const handler of this.dispose_list) handler.dispose()
    }
}