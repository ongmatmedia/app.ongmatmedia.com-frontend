import { ObjectType, ID, Field, Int } from "type-graphql";
import { Long } from "../aws-scalar";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { PaymentMethod } from "./PaymentMethod";
import { ServicePricing } from "./ServicePricing";

@table('users')
@ObjectType()
export class User {

  @hashKey()
  sub: string

  @attribute()
  @Field()
  username: string

  @attribute()
  @Field()
  email: string

  @attribute()
  @Field()
  facebook_uid: string

  @Field(type => ID, {})
  id: string

  @attribute()
  @Field(type => Long, {})
  balance: number

  @attribute()
  @Field({nullable: true})
  pricing?: ServicePricing

  @Field(type => Int)
  price_percent: number

  @Field(type => [PaymentMethod], { nullable: true })
  payment_methods: PaymentMethod[]

  @Field({})
  creator_id: string

  @Field(type => Long)
  created_at: number

  @Field(type => Long)
  updated_at: number

}
