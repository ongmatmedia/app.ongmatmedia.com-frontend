import { commitMutation } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';
import graphql from 'babel-plugin-relay/macro';
import { LivestreamUpdateInput } from '../types';

const mutation = graphql`
  mutation updateLivestreamMutation($task: LivestreamUpdateInput!) {
    update_livestream(task: $task) {
      id
      videos {
        thumbnail_url
      }
      time
      name
      active
      updated_time
    }
  }
`;

export const update_livestream = async (task: LivestreamUpdateInput) =>
  new Promise(async (success: Function, reject: Function) => {
    commitMutation(RelayEnvironment as any, {
      variables: { task },
      mutation,
      onCompleted: store => {
        success();
      },
      onError: error => {
        reject(error);
      },
    });
  });
