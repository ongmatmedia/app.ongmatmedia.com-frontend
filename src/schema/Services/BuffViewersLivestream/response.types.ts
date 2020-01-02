import { ObjectType, Field } from 'type-graphql';
import { User } from '../../User/User';
import { PaymentHistoryEdge } from '../../PaymentHistory/PaymentHistoryEdge';
import { BuffViewersLivestreamEdge } from './BuffViewersLivestreamEdge';

@ObjectType()
export class BuffViewersLivestreamTaskCUDResponse {
  @Field()
  buff: BuffViewersLivestreamEdge;

  @Field()
  me: User;

  @Field({ nullable: true })
  payment_history: PaymentHistoryEdge;
}
