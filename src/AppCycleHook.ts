import { Auth,  } from 'aws-amplify';
import { GraphQLSubscription } from './graphql/subscriptions';
import { FirebaseConfigVAPIDKEY, FirebaseConfig } from './config';
import * as firebase from "firebase/app";
import "firebase/messaging";


const initializedFirebaseApp = firebase.initializeApp(FirebaseConfig);
const FirebaseMessaging = initializedFirebaseApp.messaging();
FirebaseMessaging.usePublicVapidKey(FirebaseConfigVAPIDKEY);


export class AppCycleHook {
    static async logout() {
        Auth.signOut()
        await GraphQLSubscription.unsubscribeAll()

        // Clear notification token
    }

    static async onLoginSuccess() {
        await GraphQLSubscription.subscriblePrivateEvents()
        // Enable push
        console.log({ token: await FirebaseMessaging.getToken() })
    }

    static async register_service_worker() {
        if (!('serviceWorker' in navigator && 'PushManager' in window)) return console.error('Push messaging is not supported')
        await new Promise((s, r) => Notification.requestPermission(state => state == 'granted' ? s() : r())).catch(e => console.log('Please enable notification'))
        const sw = await navigator.serviceWorker.register('/sw.js')
        firebase.messaging().useServiceWorker(sw)
        console.log({ token: await FirebaseMessaging.getToken() })
    }
}