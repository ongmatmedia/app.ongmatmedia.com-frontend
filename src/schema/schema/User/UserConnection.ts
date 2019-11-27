import { ObjectType, Field } from "type-graphql";
import { UserEdge } from "./UserEdge";
import { PageInfo } from "../PageInfo";

@ObjectType()
export class UserConnection{
  @Field(type => UserEdge)
  edges: [UserEdge]

  @Field(type => PageInfo)
  pageInfo: PageInfo
}