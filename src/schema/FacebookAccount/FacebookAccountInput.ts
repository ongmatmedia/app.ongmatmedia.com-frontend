import { InputType, Field } from 'type-graphql';
import { Long } from '../aws-scalar';

@InputType()
export class FacebookAccountInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  cookie: string;

  @Field()
  access_token: string;
}
