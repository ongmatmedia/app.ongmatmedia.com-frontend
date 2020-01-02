import { Field, ObjectType } from 'type-graphql';
import { BuffViewersLivestreamEdge } from './BuffViewersLivestreamEdge';
import { PageInfo } from '../../PageInfo';

@ObjectType()
export class BuffViewersLivestreamConnection {
  @Field(type => [BuffViewersLivestreamEdge])
  edges: BuffViewersLivestreamEdge[];

  @Field()
  pageInfo: PageInfo;
}
