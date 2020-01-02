import React, { Component, useState, useEffect } from 'react';
import { Drawer, Layout } from 'antd';
import { withAppDrawerState } from '../../store/app-drawer';
import { SidebarContent } from '../../components/SidebarContent';
import { CustomScrollbars } from '../../components/CustomScrollbars';
import { IReactComponent } from 'mobx-react';

export const Sider = withAppDrawerState<{ Menu: IReactComponent }>(props => {
  useEffect(() => {
    return () => props.store.toggle(false);
  }, []);

  return props.store.is_mobile ? (
    <Drawer
      placement="left"
      closable={false}
      getContainer={false as any}
      style={{ position: 'absolute' }}
      bodyStyle={{ padding: 0 }}
      visible={props.store.is_open_drawer}
      onClose={() => props.store.toggle()}
    >
      <props.Menu />
    </Drawer>
  ) : (
    <Layout.Sider
      style={{ margin: 0, width: '100%' }}
      trigger={null}
      collapsed={props.store.is_open_drawer}
      collapsedWidth={0}
      theme="light"
      collapsible
    >
      <CustomScrollbars>
        <props.Menu />
      </CustomScrollbars>
    </Layout.Sider>
  );
});
