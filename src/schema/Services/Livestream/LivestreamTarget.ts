import { ObjectType, InputType, Field } from 'type-graphql';
import { LivestreamFacebookTarget } from './LivestreamFacebookTarget';

@ObjectType()
@InputType('LivestreamTargetInput')
export class LivestreamTarget {
  @Field(type => [String])
  rtmps: string[];

  @Field(type => [LivestreamFacebookTarget])
  facebooks: LivestreamFacebookTarget[];
}
