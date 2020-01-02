import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Long } from '../aws-scalar';
import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('payment-histories')
@ObjectType()
export class PaymentHistory {
  @hashKey()
  user_id: string;

  @Field(type => ID)
  id: string;

  @rangeKey()
  @Field(type => Long, {})
  time: number;

  @attribute()
  @Field(type => Int, {})
  total: number;

  @attribute()
  @Field()
  sender_username: string;

  @attribute()
  @Field()
  sender_id: string;

  @attribute()
  @Field({ nullable: true })
  receiver_username: string;

  @attribute()
  @Field()
  service: string;

  @attribute()
  @Field({ nullable: true })
  receiver_id: string;

  @attribute()
  @Field(type => Long)
  balance_after: number;

  @attribute()
  @Field()
  note: string;

  @attribute()
  @Field(type => Int)
  discount: number;
}
