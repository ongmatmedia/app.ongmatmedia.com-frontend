export const GraphQLEndpoint = 'https://7qwdnah2rbbopjl5cgj7w5jgqe.appsync-api.us-east-1.amazonaws.com/graphql';

export const AmplifyConfig = {
  aws_appsync_graphqlEndpoint: GraphQLEndpoint,
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Auth: {
    identityPoolId: 'arn:aws:cognito-idp:us-east-1:160640073465:userpool',
    region: 'us-east-1',
    userPoolWebClientId: '5jsn7g62sgsc69vcitn1ld8co4',
    userPoolId: 'us-east-1_SNJlNZ7oX',
  },
  Analytics: {
    disabled: true,
  },
};

