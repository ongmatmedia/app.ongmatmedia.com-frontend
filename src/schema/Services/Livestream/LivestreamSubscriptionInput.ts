import { InputType, Int, Field } from 'type-graphql';

@InputType()
export class LivestreamSubscriptionInput {
  @Field(type => Int)
  quality: number;

  @Field(type => Int)
  concurrent_limit: number;
}
