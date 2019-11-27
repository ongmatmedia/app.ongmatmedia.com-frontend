import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../PageInfo";
import {  FacebookAccountEdge } from "./FacebookAccountEdge";


@ObjectType()
export class FacebookAccountConnection {
    @Field(type => FacebookAccountEdge)
    edges: [FacebookAccountEdge]

    @Field(type => PageInfo)
    pageInfo: PageInfo
}
