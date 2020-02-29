import { Alert, Avatar, Col, Icon, Row, Select, Spin } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../../../graphql/RelayEnvironment';
import { FacebookAccount, FacebookAccountConnection } from '../../../types';
import { LivestreamFacebookTargetType } from './LivestreamFacebookTargetType';
import { FacebookGraphAPI } from '../../../api/FacebookGraphAPI';

const getAccountsQuery = graphql`
  query LivestreamTargetItemSelectorTabQuery {
    facebook_accounts {
      edges {
        node {
          id
          name
          touch_access_token
        }
      }
    }
  }
`;

const { Option } = Select;

export type FacebookAccountTarget = {
  type: LivestreamFacebookTargetType;
  selected: string[];
  onSelect: (uid: string, name: string, owner?: string) => void;
  onClose: Function;
};

const Loading = () => (
  <Row type="flex" justify="space-around">
    <Col>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
    </Col>
  </Row>
);

export const LivestreamTargetItemSelector = (props: FacebookAccountTarget) => {
  const [groups_pages, set_groups_pages] = useState<Array<{ id: string; name: string }>>([]);
  const [selected_account, select_account] = useState<FacebookAccount | null>(null);
  const [loading_groups_pages, set_loading_groups_pages] = useState<boolean>(false);

  const selectable_groups_pages = groups_pages.filter(o => !props.selected.includes(o.id));

  const load_groups_pages = async (access_token: string) => {
    set_loading_groups_pages(true);
    const fb = new FacebookGraphAPI(access_token);
    const url = `/me/${props.type == LivestreamFacebookTargetType.group ? 'groups' : 'accounts'}`;
    const { data } = await fb.get<{ data: Array<{ name: string; id: string }> }>(url);
    if (data) {
      set_groups_pages(data);
    } else {
    }
    set_loading_groups_pages(false);
  };

  const onSelectAccount = async (acc: FacebookAccount) => {
    props.type == 'profile'
      ? props.onSelect(acc.id, acc.name)
      : (select_account(acc), load_groups_pages(acc.touch_access_token  || ''));
  };

  return (
    <span>
      <QueryRenderer
        environment={RelayEnvironment}
        query={getAccountsQuery}
        variables={{}}
        render={rs => {
          const accounts_loading = rs.props == null;
          const accounts: FacebookAccount[] = accounts_loading
            ? []
            : ((rs.props as any).facebook_accounts as FacebookAccountConnection).edges.map(
                e => e.node,
              );

          if (accounts_loading) return <Loading />;

          if (accounts.length == 0) {
            return (
              <Alert
                message="Add a facebook account to system to broadcast livestream !"
                type="warning"
              />
            );
          }

          const selectable_accounts = accounts.filter(a => !props.selected.includes(a.id));

          if (selectable_accounts.length == 0) {
            return (
              <Alert
                message={`You will broadcast livestream to all your ${props.type}s !`}
                type="success"
              />
            );
          }

          return (
            <Select
              size="large"
              showSearch
              placeholder="Select facebook account"
              optionFilterProp="children"
              onChange={uid => onSelectAccount(accounts.filter(a => a.id == uid)[0])}
            >
              {accounts.map((account, index) => (
                <Option value={account.id} key={index}>
                  <Avatar src={`http://graph.facebook.com/${account.id}/picture?type=large`} />
                  <span style={{ marginLeft: 10 }}>{account.name}</span>
                </Option>
              ))}
            </Select>
          );
        }}
      />

      {loading_groups_pages && <Loading />}

      {props.type != 'profile' &&
        !loading_groups_pages &&
        (selectable_groups_pages.length > 0 ? (
          <Select
            size="large"
            showSearch
            placeholder="Select facebook account"
            optionFilterProp="children"
            style={{ marginTop: 10 }}
            onChange={(id: string) => {
              props.onSelect(
                id,
                selectable_groups_pages.filter(a => a.id == id)[0].name,
                selected_account ? selected_account.id : undefined,
              );
            }}
          >
            {selectable_groups_pages.map((account, index) => (
              <Option value={account.id} key={index}>
                <span style={{ marginLeft: 10 }}>{account.name}</span>
              </Option>
            ))}
          </Select>
        ) : (
          selected_account &&
          (selectable_groups_pages.length > 0 ? (
            <Alert
              style={{ marginTop: 10 }}
              message={`All ${props.type}  of ${selected_account} selected`}
              type="warning"
            />
          ) : (
            <Alert style={{ marginTop: 10 }} message={`No more ${props.type}`} type="info" />
          ))
        ))}
    </span>
  );
};
