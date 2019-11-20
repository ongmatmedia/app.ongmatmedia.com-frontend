import { ObjectType, Field, ID, Int } from "type-graphql";
import { Long } from "../aws-scalar";

@ObjectType()
export class PaymentHistory {

    @Field(type => ID)
    id: string

    @Field(type => Long, {})
    time: number

    @Field(type => Int, {})
    total: number

    @Field()
    sender_username: string

    @Field()
    sender_id: string

    @Field({ nullable: true })
    receiver_username: string

    @Field()
    service: string


    @Field({ nullable: true })
    receiver_id: string

    @Field(type => Long)
    balance_after: number

    @Field()
    note: string

    @Field(type => Int)
    discount: string
}