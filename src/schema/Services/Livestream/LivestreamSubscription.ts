import { Field, Int, ObjectType, InputType, ID } from "type-graphql";
import { AWSJSON, Long } from "../../aws-scalar";
import { table, hashKey, attribute } from "@aws/dynamodb-data-mapper-annotations";


@table('livestream-subscription')
@ObjectType()
export class LivestreamSubscription {

    @Field(type => ID)
    id : string

    @hashKey()
    @Field()
    user_id: string

    @attribute()
    @Field(type => Int)
    quality: number

    @attribute()
    @Field(type => Int)
    concurrent_limit: number

    @attribute()
    @Field(type => Long)
    end_time: number

    @attribute()
    @Field(type => Int)
    playing: number
}