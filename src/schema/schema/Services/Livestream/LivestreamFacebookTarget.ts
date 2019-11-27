import { ObjectType, Field, InputType } from "type-graphql";
import { LivestreamFacebookObject } from "./LivestreamFacebookObject";
import { LivestreamFacebookTargetType } from "./LivestreamFacebookTargetType";

import { registerEnumType } from "type-graphql"
registerEnumType(LivestreamFacebookTargetType, { name: "LivestreamFacebookTargetType" })

@ObjectType()
@InputType('LivestreamFacebookTargetInput')
export class LivestreamFacebookTarget {

    @Field()
    uid: string

    @Field()
    name: string

    @Field({ nullable: true })
    owner?: string

    @Field(type => LivestreamFacebookTargetType)
    type: LivestreamFacebookTargetType
}