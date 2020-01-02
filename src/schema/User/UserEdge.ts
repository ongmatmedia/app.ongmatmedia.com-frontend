import { ObjectType, Field } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class UserEdge {
  @Field()
  cursor: string;

  @Field(type => User)
  node: User;
}
