import { ObjectType, Field, Int, ID } from "type-graphql";
import { Long } from "../../aws-scalar";
import { LivestreamTarget } from "./LivestreamTarget";
import { LivestreamVideo } from './LivestreamVideo'
import { v4 } from 'uuid'
import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('livestream-tasks')
@ObjectType()
export class Livestream {

    @hashKey()
    @Field()
    user_id: string

    @rangeKey({ defaultProvider: () => v4() })
    @Field(type => ID)
    id: string

    @attribute()
    @Field(type => [LivestreamVideo])
    videos: LivestreamVideo[]

    @attribute()
    @Field()
    name: string

    @attribute()
    @Field()
    active: boolean

    @attribute()
    @Field()
    status: string

    @attribute()
    @Field(type => Long)
    created_time: number

    @attribute()
    @Field(type => Long)
    updated_time: number

    @attribute()
    @Field()
    title: string

    @attribute()
    @Field({ nullable: true })
    description: string

    @attribute()
    @Field(type => Long)
    time: number

    @attribute()
    @Field()
    targets: LivestreamTarget

    @attribute({ memberType: { type: 'String' }, type: "List" })
    @Field(type => [String])
    errors: string[]
} 