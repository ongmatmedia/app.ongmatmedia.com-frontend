import { ObjectType, Field, ID } from "type-graphql";
import { AWSDateTime } from "../aws-scalar";

@ObjectType()
export class Notification {
    @Field(type => ID)
    id: string

    @Field()
    user_id: string

    @Field()
    message: string

    @Field(type => AWSDateTime)
    time: string

    @Field()
    ref: string

    @Field()
    type: string
}