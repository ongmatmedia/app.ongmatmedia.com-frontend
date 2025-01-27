import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../../graphql/RelayEnvironment'
import { CreateUpdateLivestreamPage } from '../CreateUpdateLivestreamPage/CreateUpdateLivestreamPage'

const LivestreamListItemEditQuery = graphql`
	query LivestreamListItemEditQuery($id: ID!) {
		livestream_task(id: $id) {
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
`

export const LivestreamListItemEdit = (props: {
	id: string
	onClose: Function
}) => (
	<QueryRenderer
		variables={{ id: props.id }}
		environment={RelayEnvironment}
		query={LivestreamListItemEditQuery}
		render={rs => (
			<CreateUpdateLivestreamPage
				mode="update"
				task={rs.props ? (rs.props as any).livestream_task : null}
				onClose={props.onClose}
				visible={true}
			/>
		)}
	/>
)
