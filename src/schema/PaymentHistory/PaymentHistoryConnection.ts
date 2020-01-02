import { ObjectType, Field } from 'type-graphql';
import { PaymentHistoryEdge } from './PaymentHistoryEdge';
import { PageInfo } from '../PageInfo';

@ObjectType()
export class PaymentHistoryConnection {
  @Field(type => PaymentHistoryEdge)
  edges: PaymentHistoryEdge[];

  @Field(type => PageInfo)
  pageInfo: PageInfo;
}
