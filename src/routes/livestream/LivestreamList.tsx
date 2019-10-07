import React, { useState } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { Livestream } from '../../schema/Services/Livestream/Livestream'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../configs/relayjs'
import { List, } from 'antd'
import { LivestreamListItem } from './LivestreamListItem'
import { LivestreamListItemEdit } from './LivestreamListItemEdit'
import { delete_livestream } from '../../relayjs-mutations/delete_livestream'

const ListLivestreamQuery = graphql`
    query LivestreamListQuery{
        livestream_tasks{
            edges{
                node{
                    id,
                    videos{
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
`

const LivestreamListView = (props: { loading: boolean, list: Livestream[] }) => {

    const [edit_livestream_id, set_edit_livestream_id] = useState<string | null>(null)

    return (
        <>
            {
                edit_livestream_id && <LivestreamListItemEdit id={edit_livestream_id} onClose={() => set_edit_livestream_id(null)} />
            }
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
    )

}

export const LivestreamList = () => (
    <QueryRenderer
        variables={{ limit: 150 }}
        environment={RelayEnvironment}
        query={ListLivestreamQuery}
        render={rs => (
            <LivestreamListView
                loading={rs.props == null}
                list={rs.props ? (rs.props as any).livestream_tasks.edges.map(e => e.node) : []}
            />
        )}

    />
)