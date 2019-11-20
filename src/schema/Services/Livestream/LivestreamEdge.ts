import { Field, ObjectType } from "type-graphql";
import { Livestream } from "./Livestream";

@ObjectType()
export class LivestreamEdge {
    @Field()
    node: Livestream
}