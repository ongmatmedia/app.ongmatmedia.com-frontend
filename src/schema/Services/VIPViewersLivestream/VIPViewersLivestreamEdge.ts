import { Field, ObjectType } from 'type-graphql';
import { VIPViewersLivestream } from './VIPViewersLivestream';

@ObjectType()
export class VIPViewersLivestreamEdge {
  @Field()
  node: VIPViewersLivestream;
}
