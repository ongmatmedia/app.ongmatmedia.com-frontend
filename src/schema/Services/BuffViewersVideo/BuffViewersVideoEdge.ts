import { Field, ObjectType } from 'type-graphql';
import { BuffViewersVideo } from './BuffViewersVideo';

@ObjectType()
export class BuffViewersVideoEdge {
  @Field()
  node: BuffViewersVideo;
}
