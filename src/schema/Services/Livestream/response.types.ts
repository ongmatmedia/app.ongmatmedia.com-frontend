import { ObjectType, Field } from 'type-graphql';
import { LivestreamSubscription } from './LivestreamSubscription';
import { User } from '../../User/User';
import { PaymentHistoryEdge } from '../../PaymentHistory/PaymentHistoryEdge';
import { LivestreamEdge } from './LivestreamEdge';

@ObjectType()
export class LivestreamSubscriptionUpdateResponse {
  @Field()
  livestream_subscription: LivestreamSubscription;

  @Field()
  me: User;

  @Field({ nullable: true })
  payment_history: PaymentHistoryEdge;
}
