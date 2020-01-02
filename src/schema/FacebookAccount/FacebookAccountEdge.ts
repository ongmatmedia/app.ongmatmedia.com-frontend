import { Field, ObjectType } from 'type-graphql';
import { FacebookAccount } from './FacebookAccount';

@ObjectType()
export class FacebookAccountEdge {
  @Field({ nullable: true })
  cursor: string;

  @Field(type => FacebookAccount)
  node: FacebookAccount;
}
