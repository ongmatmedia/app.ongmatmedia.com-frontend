import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class BuffViewersVideo {
    @Field()
    video_id: string

    @Field()
    title: string

    @Field()
    uid: number

    @Field()
    thumbnail: string

    @Field()
    note: string

    @Field()
    amount: number

    @Field()
    done: number

    @Field()
    created_time: number
}