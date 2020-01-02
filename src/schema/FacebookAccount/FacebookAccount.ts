import { Field, ID, ObjectType, Int } from 'type-graphql';
import { Long } from '../aws-scalar';
import { table, hashKey, rangeKey, attribute } from '@aws/dynamodb-data-mapper-annotations';

@table('facebook-accounts')
@ObjectType()
export class FacebookAccount {
  @hashKey()
  @Field()
  user_id: string;

  @rangeKey()
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @attribute()
  @Field()
  cookie: string;

  @attribute()
  @Field()
  access_token: string;

  @attribute()
  @Field()
  live: boolean;

  @Field(type => Long)
  created_at: number;

  @Field(type => Long)
  updated_at: number;
}
