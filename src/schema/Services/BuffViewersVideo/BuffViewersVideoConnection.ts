import { Field, ObjectType } from 'type-graphql';
import { PageInfo } from '../../PageInfo';
import { BuffViewersVideoEdge } from './BuffViewersVideoEdge';

@ObjectType()
export class BuffViewersVideoConnection {
  @Field(type => [BuffViewersVideoEdge])
  edges: BuffViewersVideoEdge[];

  @Field()
  pageInfo: PageInfo;
}
