import { NotificationEdge } from './NotificationEdge';
import { ObjectType, Field } from 'type-graphql';
import { PageInfo } from '../PageInfo';

@ObjectType()
export class NotificationConnection {
  @Field(type => NotificationEdge)
  edges: [NotificationEdge];

  @Field(type => PageInfo)
  pageInfo: PageInfo;
}
