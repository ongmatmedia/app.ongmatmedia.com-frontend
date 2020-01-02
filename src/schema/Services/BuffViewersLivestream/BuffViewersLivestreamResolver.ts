import { ObjectType, Query, Resolver, Arg, ID, Mutation, Int } from 'type-graphql';
import { BuffViewersLivestream } from './BuffViewersLivestream';
import { BuffViewersLivestreamQueryFilters } from './BuffViewersLivestreamQueryFilters';
import { BuffViewersLivestreamEdge } from './BuffViewersLivestreamEdge';
import { BuffViewersLivestreamConnection } from './BuffViewersLivestreamConnection';
import { BuffViewersLivestreamTaskCUDResponse } from './response.types';
import { BuffViewersLivestreamInput } from './BuffViewersLivestreamInput';

@Resolver(of => BuffViewersLivestream)
export class BuffViewersLivestreamResolver {
  @Query(type => BuffViewersLivestreamConnection)
  buff_viewers_livestream_tasks(
    @Arg('filters', type => BuffViewersLivestreamQueryFilters, { nullable: true })
    filters: BuffViewersLivestreamQueryFilters,
    @Arg('limit', type => Int, { nullable: true }) limit: number,
    @Arg('after', { nullable: true }) after: string,
  ) {}

  @Query(type => BuffViewersLivestream)
  buff_viewers_livestream_task(@Arg('id', type => ID) id: string) {}

  @Mutation(type => BuffViewersLivestreamTaskCUDResponse)
  create_buff_viewers_livestream_task(@Arg('input') input: BuffViewersLivestreamInput) {}

  @Mutation(type => BuffViewersLivestreamTaskCUDResponse)
  delete_buff_viewers_livestream_task(@Arg('id', type => ID) id: string) {}
}
