import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export const AgencyMenu = () => (
  <Menu
    theme="light"
    mode="inline"
  >
    <Menu.Item key="/agency">
      <Link to="/agency"><Icon type="unordered-list"/>Manager</Link>
    </Menu.Item>
  </Menu>
)