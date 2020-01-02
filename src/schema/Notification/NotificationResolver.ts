import { Resolver, Int, Arg, Query, Mutation, ID } from 'type-graphql';
import { NotificationConnection } from './NotificationConnection';
import { Notification } from './Notification';

@Resolver(of => Notification)
export class NotificationResolver {
  @Query(returns => [NotificationConnection])
  notifications(
    @Arg('limit', type => Int, { nullable: true }) limit: number,
    @Arg('after', { nullable: true }) after: string,
  ) {}

  @Mutation(returns => Notification)
  set_notification_read(@Arg('id', type => ID) id: string) {}
}
