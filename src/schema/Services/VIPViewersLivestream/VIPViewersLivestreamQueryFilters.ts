import { Field, Int, ObjectType, InputType } from 'type-graphql';
import { TableIntFilterInput } from '../../TableFilter';

@InputType()
export class VIPViewersLivestreamQueryFilters {
  @Field(type => TableIntFilterInput)
  amount: number;

  @Field(type => TableIntFilterInput)
  created_time: number;

  @Field(type => TableIntFilterInput)
  end_time: number;
}
