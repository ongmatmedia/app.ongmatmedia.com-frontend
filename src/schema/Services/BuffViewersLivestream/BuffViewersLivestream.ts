import { Field, ID, Int, ObjectType, InputType } from 'type-graphql';
import { Long } from '../../aws-scalar';

@ObjectType()
export class BuffViewersLivestream {
  @Field()
  user_id: string;

  @Field(type => ID)
  id: string;

  @Field()
  uid: string;

  @Field()
  name: string;

  @Field()
  note: string;

  @Field(type => Int)
  amount: number;

  @Field(type => Long)
  created_time: number;

  delay: number;
}
