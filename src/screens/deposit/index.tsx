import React, { useState } from 'react';
import { Card, List, Button, Icon, Tooltip, Row, Col, Spin, Divider, message } from 'antd';
import { PaymentInfoModal } from './PaymentInfoModal';
import { PaymentMethod } from '../../types';
import { GraphQLWrapper } from '../../graphql/GraphQLWrapper';
import { AutoDepositModal } from './AutoDepositModal'

const graphql = require('babel-plugin-relay/macro');

type DepositMethod = {
  name: string;
  account: string;
  cover: string;
  icon: string;
};

const query = graphql`
  query depositQuery {
    payment_methods {
      name
      owner
      description
      account
      image_url
      url
      qrcode
    }
  }
`;

const Preview = (props: { payment_methods: PaymentMethod[] }) => {

  const [paymentInfoModalIsVisible, setVisibleForPaymentInfoModal] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod | null>(null);

  return (
    <>
      <PaymentInfoModal isVisible={paymentInfoModalIsVisible} onClose={() => setVisibleForPaymentInfoModal(false)} data={currentPaymentMethod} />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={props.payment_methods}
        renderItem={item => (
          <List.Item>
            <Tooltip placement="top" title="Click to see detail information">
              <Card
                size="small"
                cover={<img src={item.image_url} style={{ height: 200, objectFit: 'scale-down' }} />}
                onClick={() => {
                  setCurrentPaymentMethod(item);
                  setVisibleForPaymentInfoModal(true);
                }}
              >
              </Card>
            </Tooltip>
          </List.Item>
        )}
      />
    </>
  );
}

export const DepositPage = GraphQLWrapper<{ payment_methods: PaymentMethod[] }>(
  query,
  {},
  ({ loading, data }) => (
    <Card title="Deposit" loading={loading}>
      {
        (window.location.hostname == 'localhost'|| window.location.hostname.includes('192.168') || window.location.hostname == 'app.ongmatmedia.com') && <AutoDepositModal />
      }
      {data && <Preview payment_methods={data.payment_methods} />}
    </Card>
  ),
);
