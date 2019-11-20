import { ObjectType, Field } from "type-graphql";
import { Notification } from "./Notification";




@ObjectType()
export class NotificationEdge {
    @Field()
    cursor: string

    @Field(type => Notification)
    node: Notification
}