import React from 'react';
import { List, Card, Row, Col, Icon, Avatar, Popover, Popconfirm } from 'antd';
import { QueryRenderer } from 'react-relay';
import { FacebookAccount } from '../../types';
import { delete_facebook_account } from '../../graphql/delete_facebook_account';
import { RelayEnvironment } from '../../graphql/RelayEnvironment';
const graphql = require('babel-plugin-relay/macro');

export const AccountListComponent = (props: { loading: boolean; accounts: FacebookAccount[] }) => (
  <List
    grid={{
      gutter: 10,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
      xxl: 8,
    }}
    dataSource={props.accounts}
    loading={props.loading}
    renderItem={item => (
      <List.Item>
        <Popconfirm
          placement="bottom"
          title="Do you want to delete this account"
          trigger="click"
          onConfirm={() => delete_facebook_account(item.id)}
        >
          <Card
            bodyStyle={{ padding: 10, paddingBottom: 0, cursor: 'pointer' }}
            loading={item.name == null}
          >
            <Row type="flex" justify="start" align="middle" style={{ paddingBottom: 10 }}>
              <Col>
                <Avatar src={`http://graph.facebook.com/${item.id}/picture?type=large`} size={60} />
              </Col>
              <Col style={{ marginLeft: 10 }}>{item.name}</Col>
            </Row>
          </Card>
        </Popconfirm>
      </List.Item>
    )}
  />
);

export const AccountList = () => (
  <QueryRenderer
    environment={RelayEnvironment}
    query={graphql`
      query AccountListQuery {
        facebook_accounts {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    variables={{}}
    render={rs => (
      <AccountListComponent
        loading={rs.props == null}
        accounts={rs.props ? (rs.props as any).facebook_accounts.edges.map(el => el.node) : []}
      />
    )}
  />
);
