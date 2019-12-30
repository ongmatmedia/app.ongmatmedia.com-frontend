import { ObjectType, Query, Resolver, Arg, ID, Mutation, Int } from "type-graphql";
import { BuffViewersVideo } from "./BuffViewersVideo";
import { BuffViewersVideoConnection } from "./BuffViewersVideoConnection";
import { BuffViewersVideoInput } from "./BuffViewersVideoInput";
import { BuffViewersVideoCUDResponse } from "./response.types";

@Resolver(of => BuffViewersVideo)
export class BuffViewersVideoResolver {

    @Query(type => BuffViewersVideoConnection)
    buff_viewers_video_tasks(
        @Arg('limit', type => Int, { nullable: true }) limit: number,
        @Arg('after', { nullable: true }) after: string
    ) {  } 

    @Mutation(type => BuffViewersVideoCUDResponse)
    create_buff_viewers_video_task(@Arg('input') input: BuffViewersVideoInput) { }

    @Mutation(type => BuffViewersVideoCUDResponse)
    delete_buff_viewers_video_task(
        @Arg('id', type => ID) id: string
    ) {

    }

}