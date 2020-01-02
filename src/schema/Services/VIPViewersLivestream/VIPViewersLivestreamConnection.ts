import { Field, ObjectType } from 'type-graphql';
import { VIPViewersLivestreamEdge } from './VIPViewersLivestreamEdge';
import { PageInfo } from '../../PageInfo';

@ObjectType()
export class VIPViewersLivestreamConnection {
  @Field(type => [VIPViewersLivestreamEdge])
  edges: VIPViewersLivestreamEdge[];

  @Field()
  pageInfo: PageInfo;
}
