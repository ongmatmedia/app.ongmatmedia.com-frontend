import { Field, Int, ObjectType, InputType } from 'type-graphql';

@ObjectType()
@InputType('LivestreamPricingInput')
export class LivestreamPricing {
  @Field(type => Int)
  p480: number;

  @Field(type => Int)
  p720: number;

  @Field(type => Int)
  p1080: number;
}
