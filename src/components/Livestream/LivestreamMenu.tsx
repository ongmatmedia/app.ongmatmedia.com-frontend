import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export const LivestreamMenu = () => (
  <Menu theme="light" mode="inline">
    <Menu.ItemGroup key="services" className="gx-menu-group" title="Menu">
      <Menu.Item key="/livestream">
        <Link to="/livestream">
          <Icon type="unordered-list" style={{ fontSize: 20 }} />
          Manager
        </Link>
      </Menu.Item>

      <Menu.Item key="/livestream/subscription">
        <Link to="/livestream/subscription">
          {' '}
          <Icon type="dollar" style={{ fontSize: 20 }} />
          Subscription
        </Link>
      </Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);
