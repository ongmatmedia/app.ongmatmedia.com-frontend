import { ObjectType, ID, Field, Int } from "type-graphql";
import { Long } from "../aws-scalar";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('users')
@ObjectType({})
export class User {

  @hashKey()
  sub: string

  @attribute()
  @Field({})
  username: string

  @Field(type => ID, {})
  id: string

  @attribute()
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
