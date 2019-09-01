import React from 'react';
import { Props } from "react";
import { Layout } from "antd";

export const AuthLayout = (props: Props<any>) => (
    <div className="gx-main-content-wrapper">
      <Layout className="gx-app-layout">
        <Layout>
          <Layout.Content className="gx-layout-content">
            {
              props.children
            }
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )