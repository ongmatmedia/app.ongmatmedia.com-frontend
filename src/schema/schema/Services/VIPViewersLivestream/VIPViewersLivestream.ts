import { Field, Int, ObjectType, ID } from "type-graphql";
import { Long } from "../../aws-scalar";
import { VipViewersLivestreamGroup } from "./VipViewersLivestreamGroup";

@ObjectType()
export class VIPViewersLivestream {

    @Field(type => ID!)
    id: string

    @Field()
    active: boolean

    @Field(type => Int)
    amount: number

    @Field()
    note: string

    @Field()
    name: string

    @Field(type => Long)
    created_time: number

    @Field(type => Long)
    updated_time: number

    @Field(type => Long)
    end_time: number

    @Field(type => [VipViewersLivestreamGroup])
    groups: VipViewersLivestreamGroup[]

}