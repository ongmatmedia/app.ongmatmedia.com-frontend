import { Field, InputType, Int } from 'type-graphql';
import { VipViewersLivestreamGroup } from './VipViewersLivestreamGroup';

@InputType()
export class VIPViewersLivestreamUpdateInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  note?: string;

  @Field(type => Int, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  name?: string;

  @Field(type => Int, { nullable: true })
  days?: number;

  @Field(type => [VipViewersLivestreamGroup], { nullable: true })
  groups?: VipViewersLivestreamGroup[];
}
