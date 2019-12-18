import { Field, Int, ObjectType, ID } from "type-graphql";
import { Long } from "../../aws-scalar";
import { VipViewersLivestreamGroup } from "./VipViewersLivestreamGroup";
import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('vip-viewers-livestream-tasks')
@ObjectType()
export class VIPViewersLivestream {

    @hashKey()
    user_id: string

    @rangeKey()
    @Field(type => ID!)
    id: string

    @attribute()
    @Field()
    active: boolean

    @attribute()
    @Field(type => Int)
    amount: number

    @attribute()
    @Field()
    note: string

    @attribute()
    @Field()
    name: string

    @attribute()
    @Field(type => Long)
    created_time: number

    @attribute()
    @Field(type => Long)
    updated_time: number

    @attribute()
    @Field(type => Long)
    end_time: number

    @Field(type => [VipViewersLivestreamGroup])
    groups: VipViewersLivestreamGroup[]

}