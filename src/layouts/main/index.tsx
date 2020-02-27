import React from 'react';
import { Layout } from 'antd';
import { Header } from './header';
import { IReactComponent } from 'mobx-react';

export type MainLayoutProps = {
  Content: IReactComponent;
  Menu?: IReactComponent;
};

export const MainLayout = ({ Content, Menu }: MainLayoutProps) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout
        style={{
        }}
      >
        <Layout style={{ flex: 1, padding: 10 }}>
          <Layout.Content>
            <Content />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
