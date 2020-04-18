import { FBCURL } from "./FBCURL";

interface Message {
    messages_count: number
    thread_key: {
        thread_fbid: number | null,
        other_user_id: number | null
    }
    folder: 'INBOX'
    thread_type: string
    updated_time_precise: number
}

export class FBMessage {
    constructor (private client: FBCURL) { }

    async load_messages(limit: number, before: number) {
        const doc_id = 1475048592613093
        const query_params = {
            limit,
            before,
            tags: ["INBOX", "ARCHIVED", "PENDING"],
            includeDeliveryReceipts: true,
            includeSeqID: false
        }
        const rs = await this.client.post('https://www.facebook.com/api/graphqlbatch/', {
            queries: JSON.stringify({ o0: { doc_id, query_params } })
        })
        const data = JSON.parse(rs.split('\n')[0]) as { o0: { data: { viewer: { message_threads: { nodes: Message[] } } } } }
        const messages = data.o0.data.viewer.message_threads.nodes
        return messages
    }

    async get_messages_count(): Promise<Map<string, number>> {
        const statics = new Map<string, number>()
        const data = await this.client.postForm<{
            viewer: {
                message_threads: {
                    nodes: Array<{
                        messages_count: number,
                        thread_type: string,
                        thread_key: { thread_fbid?: string, other_user_id?: string },
                        all_participants: {
                            edges: Array<{
                                node: {
                                    messaging_actor: {
                                        id: string
                                    }
                                }
                            }>
                        }
                    }>
                }
            }
        }>('https://www.facebook.com/api/graphql/', {
            q: `viewer(){message_threads{nodes{all_participants, thread_key{thread_fbid,other_user_id},messages_count,thread_type,updated_time_precise}}}`
        }, { ajax: true })

        console.log(data.viewer)

        for (const { all_participants, thread_type, thread_key, messages_count } of data.viewer.message_threads.nodes) {
            if (thread_type == 'ONE_TO_ONE' && thread_key.other_user_id) {
                statics.set(thread_key.other_user_id, messages_count)
            }
        }
        return statics
    }

}