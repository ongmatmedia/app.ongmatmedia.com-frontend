import { Resolver, Int, Arg, Query } from 'type-graphql';
import { PaymentHistory } from './PaymentHistory';
import { PaymentHistoryConnection } from './PaymentHistoryConnection';
import { Long } from '../aws-scalar';

@Resolver(of => PaymentHistory)
export class PaymentHistoryResolver {
  @Query(returns => PaymentHistoryConnection, {})
  payment_histories(
    @Arg('before_time', type => Long, { nullable: true }) before_time: number,
    @Arg('after', { nullable: true }) after: string,
  ) {}
}
