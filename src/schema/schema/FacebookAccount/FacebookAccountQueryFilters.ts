import { Field, InputType } from "type-graphql";
import { TableStringFilterInput } from "../TableFilter";

@InputType()
export class FacebookAccountQueryFilters {

    @Field(type => TableStringFilterInput, { nullable: true })
    uid: string

    @Field(type => TableStringFilterInput, { nullable: true })
    name: string

    @Field(type => TableStringFilterInput, { nullable: true })
    tags: string
}
