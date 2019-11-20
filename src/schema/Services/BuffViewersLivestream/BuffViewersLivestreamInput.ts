import { InputType, Field, ID, Int } from "type-graphql"

@InputType()
export class BuffViewersLivestreamInput {
    @Field(type => ID)
    id: string

    @Field()
    uid: string

    @Field()
    name: string

    @Field()
    note: string

    @Field(type => Int)
    amount: number 
}