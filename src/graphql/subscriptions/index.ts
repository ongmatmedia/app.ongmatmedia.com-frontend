import { listen_for_new_notification } from "./new_notification"
import { Disposable } from "react-relay"
import { Auth } from "aws-amplify"


export class GraphQLSubscription {


    static subscriblePublicEvents() {

    }

    private static dispose_list: Set<Disposable> = new Set()

    static async subscriblePrivateEvents() {

        // Get current user
        const user = await Auth.currentUserInfo()

        // Active private events
        this.unsubscribeAll()
        // this.dispose_list.add(await listen_for_new_notification())
    }

    static unsubscribeAll() {
        for (const handler of this.dispose_list) handler.dispose()
    }
}