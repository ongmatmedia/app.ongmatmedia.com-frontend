import { VIPViewersLivestream } from "./VIPViewersLivestream"
import { Resolver, Query, Arg, Mutation, Int } from "type-graphql"
import { VIPViewersLivestreamConnection } from "./VIPViewersLivestreamConnection"
import { VIPViewersLivestreamQueryFilters } from "./VIPViewersLivestreamQueryFilters"
import { VipViewersLivestreamTaskCUDResponse } from "./response.types"
import { VIPViewersLivestreamInput } from './VIPViewersLivestreamInput'
import { VIPViewersLivestreamUpdateInput } from './VIPViewersLivestreamUpdateInput'


@Resolver(of => VIPViewersLivestream)
export class VIPViewersLivestreamResolver {

    @Query(returns => VIPViewersLivestreamConnection)
    vip_viewers_livestream_tasks(
        @Arg('filters', { nullable: true }) filters: VIPViewersLivestreamQueryFilters,
        @Arg('limit', type => Int, { nullable: true }) limit: number,
        @Arg('after', { nullable: true }) after: string
    ) { }

    @Query(returns => VIPViewersLivestream)
    vip_viewers_livestream_task(
        @Arg('id') id: string
    ) { }

    @Mutation(returns => VipViewersLivestreamTaskCUDResponse)
    create_vip_viewers_livestream_task(@Arg('input') input: VIPViewersLivestreamInput) { }

    @Mutation(returns => VipViewersLivestreamTaskCUDResponse)
    update_vip_viewers_livestream_task(@Arg('input') input: VIPViewersLivestreamUpdateInput) { }

    @Mutation(returns => VipViewersLivestreamTaskCUDResponse)
    delete_vip_viewers_livestream_task(
        @Arg('id') id: string
    ) { }

}