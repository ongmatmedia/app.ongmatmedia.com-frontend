import { Field, InputType, Int } from 'type-graphql';
import { VipViewersLivestreamGroup } from './VipViewersLivestreamGroup';

@InputType()
export class VIPViewersLivestreamInput {
  @Field()
  id: string;

  @Field()
  active: boolean;

  @Field()
  note: string;

  @Field(type => Int)
  amount: number;

  @Field()
  name: string;

  @Field(type => Int)
  days: number;

  @Field(type => [VipViewersLivestreamGroup])
  groups: VipViewersLivestreamGroup[];
}
