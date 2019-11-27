import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TableIntFilterInput {

  @Field(type => Int, {nullable: true})
  ne : number
  
  @Field(type => Int, {nullable: true})
  eq : number

  @Field(type => Int, {nullable: true})
  le : number
  
  @Field(type => Int, {nullable: true})
  lt : number

  @Field(type => Int, {nullable: true})
  ge : number

  @Field(type => Int, {nullable: true})
  gt : number

  @Field(type => Int, {nullable: true})
  between : number
}
