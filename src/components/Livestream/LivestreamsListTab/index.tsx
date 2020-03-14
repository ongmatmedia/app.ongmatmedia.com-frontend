import { List } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { QueryRenderer } from 'react-relay';
import { delete_livestream } from '../../../graphql/delete_livestream';
import { RelayEnvironment } from '../../../graphql/RelayEnvironment';
import { Livestream } from '../../../types';
import { LivestreamListItem } from './LivestreamListItem';

const LivestreamsListTabQuery = graphql`
  query LivestreamsListTabQuery {
    livestream_tasks {
      edges {
        node {
          id
          videos {
            title
            is_livestream
            video_id
            thumbnail_url
            url
          }
          name
          active
          status
          created_time
          title
          description
          times
          loop_times
          targets {
            rtmps
            facebooks {
              uid
              name
              type
              owner
            }
          }
        }
      }
    }
  }
`;

const LivestreamsListView = (props: { loading: boolean; list: Livestream[], onNavigateCreateUpdateTab: Function, onSelectLiveToUpdate: (live: Livestream) => void }) => {
  return (
    <>
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
              onNavigateCreateUpdateTab={props.onNavigateCreateUpdateTab}
              onSelectLiveToUpdate={props.onSelectLiveToUpdate}
              onDelete={() => delete_livestream(live.id)}
              onPause={() => console.log('Pause')}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export const LivestreamsListTab = (props: { onNavigateCreateUpdateTab: Function, onSelectLiveToUpdate: (live: Livestream) => void }) => (
  <QueryRenderer
    variables={{ limit: 150 }}
    environment={RelayEnvironment}
    query={LivestreamsListTabQuery}
    render={rs => (
      <LivestreamsListView
        loading={rs.props == null}
        list={rs.props ? (rs.props as any).livestream_tasks.edges.map(e => e.node) : []}
        onNavigateCreateUpdateTab={props.onNavigateCreateUpdateTab}
        onSelectLiveToUpdate={props.onSelectLiveToUpdate}
      />
    )}
  />
);
