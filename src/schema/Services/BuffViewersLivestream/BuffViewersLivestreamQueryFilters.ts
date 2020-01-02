import { InputType, Field } from 'type-graphql';
import {
  TableBooleanFilterInput,
  TableStringFilterInput,
  TableIntFilterInput,
} from '../../TableFilter';

@InputType()
export class BuffViewersLivestreamQueryFilters {
  @Field(type => TableStringFilterInput)
  id: number;

  @Field(type => TableIntFilterInput)
  amount: number;

  @Field(type => TableIntFilterInput)
  created_time: number;
}
