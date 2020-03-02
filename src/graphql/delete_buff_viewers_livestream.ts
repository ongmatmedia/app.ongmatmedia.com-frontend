import { commitMutation } from 'react-relay';
import { ConnectionHandler, RecordProxy } from 'relay-runtime';
import { RelayEnvironment } from './RelayEnvironment';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation deleteBuffViewersLivestreamMutation($id: ID!) {
    delete_buff_viewers_livestream_task(id: $id) {
      buff {
        node {
          id
        }
      }
      me {
        id
        balance
      }
    }
  }
`;

export const delete_buff_viewers_livestream = async (id: string) => {
  await new Promise((s, r) => {
    commitMutation(RelayEnvironment, {
      mutation,
      variables: { id },
      updater: async store => {
        const list = store.get(`client:root:buff_viewers_livestream_tasks`) as RecordProxy;
        ConnectionHandler.deleteNode(list, id);
        s();
      },
      onError: r,
    });
  });
};
