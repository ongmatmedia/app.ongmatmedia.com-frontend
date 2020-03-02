import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Card } from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import { PaymentList } from './PaymentList';
import { PaymentListAction } from './PaymentListAction';
import { PaymentHistory, PaymentHistoryConnection } from '../../types';
import { GraphQLQueryFetcher } from '../../graphql/GraphQLWrapper';

const query = graphql`
  query paymentsQuery($after: String, $before_time: Long) {
    payment_histories(after: $after, before_time: $before_time) {
      edges {
        node {
          id
          time
          total
          sender_username
          sender_id
          receiver_username
          receiver_id
          balance_after
          note
          service
        }
      }
      pageInfo {
        next_token
        prev_token
      }
    }
  }
`;

export const Payments = () => {
  const [search, set_search] = useState<string>('');
  const [payment_histories, set_payment_histories] = useState<PaymentHistory[]>([]);
  const [next_page_token, set_next_page_token] = useState<string | undefined>(undefined);
  const [loading, set_loading] = useState<boolean>(false);

  const load = async (
    variables: { after?: string; before_time?: number } = {},
    clear: boolean = true,
  ) => {
    if (clear) await set_payment_histories([]);
    await set_loading(true);
    try {
      const data = await GraphQLQueryFetcher<{ payment_histories: PaymentHistoryConnection }>(
        query,
        variables,
      );
      set_payment_histories([
        ...(clear ? [] : payment_histories),
        ...data.payment_histories.edges.map(e => e.node),
      ]);
      data.payment_histories.pageInfo.next_token && set_next_page_token(data.payment_histories.pageInfo.next_token);
    } catch (e) {
      console.log(e);
    }
    await set_loading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Card title="Payment histories" size="small">
      <PaymentListAction
        onChangeDate={d => load({ before_time: d.getTime() })}
        onSearch={set_search}
      />
      <PaymentList
        search={search}
        has_more={next_page_token != null}
        onLoadMore={() => load({ after: next_page_token }, false)}
        payment_histories={payment_histories}
        loading={loading}
      />
    </Card>
  );
};
