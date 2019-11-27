import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../../PageInfo";
import { LivestreamEdge } from "./LivestreamEdge";
 

@ObjectType()
export class LivestreamConnection {
    @Field(type => LivestreamEdge)
    edges: LivestreamEdge[]

    @Field()
    pageInfo: PageInfo
}