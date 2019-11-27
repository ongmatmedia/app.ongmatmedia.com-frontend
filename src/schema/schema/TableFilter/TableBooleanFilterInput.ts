import { InputType, Field } from "type-graphql";

@InputType()
export class TableBooleanFilterInput {

  @Field({nullable: true})
  ne : boolean
  
  @Field({nullable: true})
  eq : boolean

}