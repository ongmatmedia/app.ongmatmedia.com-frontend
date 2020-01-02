import { Field, ID, InputType } from 'type-graphql';
import { Long } from '../../aws-scalar';
import { LivestreamTarget } from './LivestreamTarget';
import { LivestreamVideo } from './LivestreamVideo';

@InputType()
export class LivestreamUpdateInput {
  @Field(type => ID!)
  id: string;

  @Field(type => [LivestreamVideo], { nullable: true })
  videos: LivestreamVideo[];

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(type => Long, { nullable: true })
  time: number;

  @Field({ nullable: true })
  targets: LivestreamTarget;
}
