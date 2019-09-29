import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { Livestream } from '../../schema/Services/Livestream/Livestream'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../configs/relayjs'


const ListLivestreamQuery = graphql`
    query LivestreamListQuery{
        livestream_tasks{
            edges{
                node{
                    id,
                    videos{
                        thumbnail_url
                    }
                    name
                    note
                    active
                    created_time
                    updated_time
                    time  
                }
            }
        }
    }
`

const LivestreamListView = (props: { loading: boolean, list: Livestream[] }) => (
    <span>
        {
            JSON.stringify(props)
        }
    </span>
)

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