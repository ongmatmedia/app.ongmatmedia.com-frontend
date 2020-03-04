import { Auth } from 'aws-amplify';
import { GraphQLSubscription } from './graphql/subscriptions';

export class AppCycleHook {
    static async logout() {
        Auth.signOut()
        await GraphQLSubscription.unsubscribeAll()
    }

    static async onLoginSuccess() {
        await GraphQLSubscription.subscriblePrivateEvents()
    }
}