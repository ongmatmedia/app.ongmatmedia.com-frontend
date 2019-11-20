import { Field, InputType } from "type-graphql";
import { Long } from "../../aws-scalar";
import { LivestreamTarget } from "./LivestreamTarget";
import { LivestreamVideo } from "./LivestreamVideo";

@InputType()
export class LivestreamInput {

    @Field(type => [LivestreamVideo])
    videos: LivestreamVideo[]
 

    @Field()
    name: string

    @Field(type => Long)
    time: number

    @Field()
    title: string

    @Field()
    description: string 

    @Field()
    targets: LivestreamTarget
}
