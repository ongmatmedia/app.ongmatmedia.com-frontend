import Card from 'antd/lib/card'
import List from 'antd/lib/list'
import Spin from 'antd/lib/spin'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { delete_livestream } from '../../../graphql/delete_livestream'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { stop_livestream } from '../../../graphql/stop_livestream'
import { Livestream } from '../../../types'
import { LivestreamListItem } from './LivestreamListItem'

const LivestreamsListPageQuery = graphql`
	query LivestreamsListPageQuery {
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
`

const LivestreamsListView = (props: {
	loading: boolean
	list: Livestream[]
}) => {
	const [loadingOnStopLivestream, setLoadingOnStopLivestream] = useState<
		boolean
	>(false)

	return (
		<Card title={<BreadCrumb />}>
			<Spin spinning={loadingOnStopLivestream}>
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
								onDeleteLivestream={() => delete_livestream(live.id)}
								onStopLivestream={async () => {
									setLoadingOnStopLivestream(true)
									await stop_livestream(live.id)
									setLoadingOnStopLivestream(false)
								}}
							/>
						</List.Item>
					)}
				/>
			</Spin>
		</Card>
	)
}

export const LivestreamsListPage = () => (
	<QueryRenderer
		variables={{ limit: 150 }}
		environment={RelayEnvironment}
		query={LivestreamsListPageQuery}
		render={rs => (
			<LivestreamsListView
				loading={rs.props == null}
				list={
					rs.props
						? (rs.props as any).livestream_tasks.edges.map(e => e.node)
						: []
				}
			/>
		)}
	/>
)
