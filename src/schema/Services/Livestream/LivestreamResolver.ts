import { Resolver, Mutation, Arg, Query, Int, Args, ID } from 'type-graphql';
import { LivestreamSubscription } from './LivestreamSubscription';
import { Livestream } from './Livestream';
import { LivestreamConnection } from './LivestreamConnection';
import { LivestreamEdge } from './LivestreamEdge';
import { LivestreamUpdateInput } from './LivestreamUpdateInput';
import { LivestreamInput } from './LivestreamInput';
import { LivestreamQueryFilters } from './LivestreamQueryFilters';
import { LivestreamSubscriptionInput } from './LivestreamSubscriptionInput';
import { LivestreamSubscriptionUpdateResponse } from './response.types';

@Resolver(of => Livestream)
export class LivestreamResolver {
  @Query(result => LivestreamSubscription, { nullable: true })
  livestream_subscription(@Arg('user_id', type => ID, { nullable: true }) id: string) {}

  @Mutation(result => LivestreamSubscriptionUpdateResponse)
  update_livestream_subscription(
    @Arg('user_id', type => ID, { nullable: true }) id: string,
    @Arg('data') data: LivestreamSubscriptionInput,
    @Arg('days', type => Int) days: number,
  ) {}

  @Query(result => LivestreamConnection)
  livestream_tasks(
    @Arg('filters', type => LivestreamQueryFilters, { nullable: true })
    filters: LivestreamQueryFilters,
    @Arg('limit', type => Int, { nullable: true }) limit: number,
    @Arg('after', { nullable: true }) after: string,
  ) {}

  @Query(result => Livestream)
  livestream_task(@Arg('id', type => ID) id: string) {}

  @Mutation(result => LivestreamEdge)
  create_livestream(@Arg('task', type => LivestreamInput) task: LivestreamInput) {}

  @Mutation(result => Livestream)
  update_livestream(@Arg('task', type => LivestreamUpdateInput) task: LivestreamUpdateInput) {}

  @Mutation(result => Boolean)
  delete_livestream(@Arg('id', type => ID) id: string) {}
}
