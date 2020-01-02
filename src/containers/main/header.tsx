import React from 'react';
import { Layout } from 'antd';
import { TopBar } from '../../components/TopBar';

export const Header = () => (
  <Layout.Header
    style={{
      height: 55,
      background: 'linear-gradient(to right, #2574a8, #514a9d)',
      padding: 0,
    }}
  >
    <TopBar />
  </Layout.Header>
);
