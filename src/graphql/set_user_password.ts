import { commitMutation } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation setUserPasswordMutation($password: String!, $user_id: String!) {
    set_user_password(user_id: $user_id, password: $password)
  }
`;
export const set_user_password = (user_id: string, password: string) =>
  new Promise(async (success: Function, reject: Function) => {
    commitMutation(RelayEnvironment as any, {
      variables: { user_id, password },
      mutation,
      updater: store => {
        success();
      },
      onError: error => {
        reject(error);
      },
    });
  });
