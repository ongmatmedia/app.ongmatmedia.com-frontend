import { commitMutation } from 'react-relay';
import { ConnectionHandler, RecordProxy } from 'relay-runtime';
import { RelayEnvironment } from '../configs/relayjs';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation sendMoneyMutation($note: String!, $amount: Int!, $user_id: String!) {
    send_money(note: $note, amount: $amount, user_id: $user_id) {
      payment_history {
        node {
          id
          time
          total
          receiver_username
          receiver_id
          balance_after
          note
        }
      }
      me {
        id
        balance
      }
      user {
        node {
          id
          balance
        }
      }
    }
  }
`;
export const send_money = (
  note: string,
  amount: number,
  user_id: string,
  receiver_amount: number,
) =>
  new Promise(async (success: Function, reject: Function) => {
    commitMutation(RelayEnvironment as any, {
      variables: { note, amount, user_id },
      mutation,
      updater: store => {
        success();
      },
      onError: error => {
        reject(error);
      },
    });
  });
