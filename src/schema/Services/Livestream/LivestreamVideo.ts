import { ObjectType, Field, Int, ID, InputType } from 'type-graphql';

@ObjectType()
@InputType('LivestreamVideoInput')
export class LivestreamVideo {
  @Field()
  title: string;

  @Field()
  is_livestream: boolean;

  @Field()
  video_id: string;

  @Field()
  thumbnail_url: string;

  @Field()
  url: string;
}
