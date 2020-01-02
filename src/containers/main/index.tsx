import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Menu, Breadcrumb, Icon } from 'antd';
import { Header } from './header';
import { Sider } from './sider';
import { observer, IReactComponent } from 'mobx-react';
import { RouterProps } from 'react-router';

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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        {Menu && <Sider Menu={Menu} />}
        <Layout style={{ flex: 1, padding: 10 }}>
          <Layout.Content>
            <Content />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
