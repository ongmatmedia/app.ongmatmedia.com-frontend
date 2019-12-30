import { ObjectType, Field } from "type-graphql";
import { User } from "../../User/User";
import { PaymentHistoryEdge } from "../../PaymentHistory/PaymentHistoryEdge";
import { BuffViewersVideoEdge } from "./BuffViewersVideoEdge";

@ObjectType()
export class BuffViewersVideoCUDResponse {
    @Field()
    buff: BuffViewersVideoEdge

    @Field()
    me: User

    @Field({nullable: true})
    payment_history: PaymentHistoryEdge
}