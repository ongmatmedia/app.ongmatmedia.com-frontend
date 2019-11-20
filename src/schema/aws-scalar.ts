import { GraphQLScalarType } from "graphql";

function getType(name: string){
    return new GraphQLScalarType({
        name,
        parseValue()   { },
        serialize()    { },
        parseLiteral() { },
      });
}

export const AWSJSON  = getType('AWSJSON')
export const AWSEmail = getType('AWSEmail')
export const AWSDate = getType('AWSDate')
export const AWSPhone = getType('AWSPhone')
export const AWSDateTime = getType('AWSDateTime')
export const Long = getType('Long')

