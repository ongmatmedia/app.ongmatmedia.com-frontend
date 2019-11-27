import { Field, ObjectType } from "type-graphql";
import { BuffViewersLivestream } from "./BuffViewersLivestream";



@ObjectType()
export class BuffViewersLivestreamEdge{
    @Field()
    node: BuffViewersLivestream
}