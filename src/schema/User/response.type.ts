import { ObjectType, Field } from 'type-graphql';
import { PaymentHistoryEdge } from '../PaymentHistory/PaymentHistoryEdge';
import { User } from './User';
import { UserEdge } from './UserEdge';

@ObjectType()
export class SendmoneyResponse {
  @Field()
  payment_history: PaymentHistoryEdge;

  @Field()
  me: User;

  @Field()
  user: UserEdge;
}
