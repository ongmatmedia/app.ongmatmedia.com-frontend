import { InputType, Field } from "type-graphql";

@InputType()
export class TableStringFilterInput {

  @Field({nullable: true})
  ne : string
  
  @Field({nullable: true})
  eq : string

  @Field({nullable: true})
  le : string
  
  @Field({nullable: true})
  lt : string

  @Field({nullable: true})
  ge : string

  @Field({nullable: true})
  gt : string

  @Field({nullable: true})
  between : string
  
}

