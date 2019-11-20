import { InputType, Field, Int } from "type-graphql";
import { TableStringFilterInput } from "../../TableFilter";
import { Long } from "../../aws-scalar";

@InputType()
export class LivestreamQueryFilters {

    @Field()
    active: boolean

    @Field(type => Long)
    created_time: number 
}
 