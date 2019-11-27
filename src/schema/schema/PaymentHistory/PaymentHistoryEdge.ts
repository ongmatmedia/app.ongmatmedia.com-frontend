import { ObjectType, Field } from "type-graphql";
import { PaymentHistory } from "./PaymentHistory";

@ObjectType()
export class PaymentHistoryEdge{ 
    @Field(type => PaymentHistory)
    node: PaymentHistory
}