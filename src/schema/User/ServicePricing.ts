import { ObjectType, Field, InputType, Int } from 'type-graphql';
import { LivestreamPricing } from '../Services/Livestream/LivestreamPricing';

@ObjectType()
@InputType('ServicePricingInput')
export class ServicePricing {
  @Field(type => Int)
  buff_viewers_livestream: number;

  @Field(type => Int)
  vip_viewers_livestream: number;

  @Field()
  livestream: LivestreamPricing;
}
