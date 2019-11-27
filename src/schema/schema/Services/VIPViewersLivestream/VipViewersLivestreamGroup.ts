import {ObjectType, Field, InputType, ID} from 'type-graphql'

@ObjectType()
@InputType('VipViewersLivestreamGroupInput')
export class VipViewersLivestreamGroup{

    @Field(type => ID)
    id: string

    
    @Field()
    image: string

    

    @Field()
    name: string
}