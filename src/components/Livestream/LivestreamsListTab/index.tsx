import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { List } from 'antd';
import { LivestreamListItem } from './LivestreamListItem';
import { Livestream } from '../../../types';
import { LivestreamListItemEdit } from './LivestreamListItemEdit';
import { delete_livestream } from '../../../graphql/delete_livestream';
import { RelayEnvironment } from '../../../graphql/RelayEnvironment';

const LivestreamsListTabQuery = graphql`
  query LivestreamsListTabQuery {
    livestream_tasks {
      edges {
        node {
          id
          videos {
            thumbnail_url
          }
          status
          name
          active
          created_time
          updated_time
          time
        }
      }
    }
  }
`;

const LivestreamsListView = (props: { loading: boolean; list: Livestream[] }) => {
  const [edit_livestream_id, set_edit_livestream_id] = useState<string | null>(null);

  return (
    <>
      {edit_livestream_id && (
        <LivestreamListItemEdit
          id={edit_livestream_id}
          onClose={() => set_edit_livestream_id(null)}
        />
      )}
      <List
        grid={{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={props.list}
        loading={props.loading}
        renderItem={live => (
          <List.Item>
            <LivestreamListItem
              live={live}
              onEdit={() => set_edit_livestream_id(live.id)}
              onDelete={() => delete_livestream(live.id)}
              onPause={() => console.log('Pause')}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export const LivestreamsListTab = () => (
  <QueryRenderer
    variables={{ limit: 150 }}
    environment={RelayEnvironment}
    query={LivestreamsListTabQuery}
    render={rs => (
      <LivestreamsListView
        loading={rs.props == null}
        list={rs.props ? (rs.props as any).livestream_tasks.edges.map(e => e.node) : [
          {
            id: 123456,
            videos: [
              {
                thumbnail_url: 'https://via.placeholder.com/150'
              },
              {
                thumbnail_url: 'https://via.placeholder.com/150'
              }
            ],
            status: 'test',
            name: 'test',
            active: true,
            created_time: 123456789,
            updated_time: 123456789,
            time: 123456789,
          }
        ]}
      />
    )}
  />
);
