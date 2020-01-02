import React from 'react';
import { SubscriptionView } from './SubscriptionView';
import { Card } from 'antd';

export const LivestreamSubscriptionPage = () => (
  <span>
    <Card title="Livestream subscription" bodyStyle={{ padding: 20 }}>
      <SubscriptionView />
    </Card>
  </span>
);
