import { ObjectType, Field, InputType } from "type-graphql"

@InputType()
export class BuffViewersVideoInput {
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
}