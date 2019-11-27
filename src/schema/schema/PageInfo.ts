
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo {
    @Field({ nullable: true })
    next_token?: string

    @Field({ nullable: true })
    prev_token?: string
}