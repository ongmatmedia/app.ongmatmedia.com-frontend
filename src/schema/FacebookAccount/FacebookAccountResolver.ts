import { Resolver, Query, Arg, Mutation, ID, Int } from 'type-graphql';
import { FacebookAccountQueryFilters } from './FacebookAccountQueryFilters';
import { FacebookAccountConnection } from './FacebookAccountConnection';
import { FacebookAccount } from './FacebookAccount';
import { FacebookAccountEdge } from './FacebookAccountEdge';
import { FacebookAccountInput } from './FacebookAccountInput';

@Resolver(of => FacebookAccount)
export class FacebookAccountResolver {
  @Query(returns => FacebookAccountConnection, { nullable: true })
  facebook_accounts(
    @Arg('filter', type => FacebookAccountQueryFilters, { nullable: true })
    filter: FacebookAccountQueryFilters,
    @Arg('limit', type => Int, { nullable: true }) limit: number,
    @Arg('after', { nullable: true }) after: string,
  ) {}

  @Query(returns => FacebookAccount)
  facebook_account(@Arg('uid', type => ID) uid: number) {}

  @Mutation(returns => FacebookAccountEdge)
  add_facebook_account(@Arg('input', type => FacebookAccountInput) id: FacebookAccountInput) {}

  @Mutation(returns => FacebookAccount)
  update_facebook_account(@Arg('input', type => FacebookAccountInput) id: FacebookAccountInput) {}

  @Mutation(returns => Boolean)
  delete_facebook_account(@Arg('id', type => ID) id: number) {}
}
