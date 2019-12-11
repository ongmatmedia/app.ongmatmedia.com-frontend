import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType('PaymentMethodInput')
export class PaymentMethod{

    @Field()
    name: string

    @Field()
    owner: string

    @Field()
    description: string

    @Field()
    account: string
}