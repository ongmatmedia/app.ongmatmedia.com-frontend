import { ObjectType, ID, Field, Int } from "type-graphql";
import { Long } from "../aws-scalar";


@ObjectType({})
export class User {

  @Field({})
  username: string

  @Field(type => ID, {})
  id: string

  @Field(type => Long, {})
  balance: number

  @Field(type => Int, {})
  price_percent: number

  @Field({})
  creator_id: string

  @Field(type => Long)
  created_at: number

  @Field(type => Long)
  updated_at: number
  
}
