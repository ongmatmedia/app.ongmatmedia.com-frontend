import { ObjectType, Field } from 'type-graphql';
import { VIPViewersLivestreamEdge } from './VIPViewersLivestreamEdge';
import { User } from '../../User/User';
import { PaymentHistoryEdge } from '../../PaymentHistory/PaymentHistoryEdge';

@ObjectType()
export class VipViewersLivestreamTaskCUDResponse {
  @Field()
  vip: VIPViewersLivestreamEdge;

  @Field()
  me: User;

  @Field({ nullable: true })
  payment_history: PaymentHistoryEdge;
}
