import { ObjectType, Field, InputType } from "type-graphql";
import { LivestreamFacebookTargetType } from "./LivestreamFacebookTargetType";

@ObjectType()
@InputType('LivestreamFacebookObjectInput')
export class LivestreamFacebookObject{

    @Field()
    uid: string

    @Field(type => LivestreamFacebookTargetType)
    type: LivestreamFacebookTargetType

    @Field()
    name: string
}