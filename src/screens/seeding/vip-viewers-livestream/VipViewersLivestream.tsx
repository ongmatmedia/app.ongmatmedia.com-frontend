import {Card, Alert, Skeleton} from 'antd'
import {graphql} from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {BreadCrumb} from '../../../components/common/BreadCrumb'
import {VipViewersLivestreamAction} from './VipViewersLivestreamAction'
import {VipViewersLivestreamList} from './VipViewersLivestreamList'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {VipViewersLivestreamConnection} from '../../../types'
import
{
	VipViewersLivestreamReport,
	VipViewersLivestreamReportStatusFilter,
} from './VipViewersLivestreamReport'

const query = graphql`
	query VipViewersLivestreamQuery {
		vip_viewers_livestream_tasks {
			edges {
				node {
					id
					active
					name
					amount
					max_duration
					livestream_nums
					livestream_used_nums
					created_at
				}
			}
		}
	}
`

export const VipViewersLivestreamPage = GraphQLWrapper<
	{vip_viewers_livestream_tasks: VipViewersLivestreamConnection},
	{}
>(query, {}, ({data, loading, error}) =>
{
	if (error)
	{
		return (
			<Card title={<BreadCrumb />} style={{height: '100%'}}>
				<Alert
					showIcon
					type="error"
					message={JSON.parse(error)?.errors[0].message}
				/>
			</Card>
		)
	}

	const [search, set_search] = useState<string>('')
	const [status_filter, set_status_filter] = useState<
		VipViewersLivestreamReportStatusFilter
	>('all')

	if (loading && !data && !error)
		return (
			<>
				<Card title={<BreadCrumb />} style={{height: '100%'}}>
					<Skeleton active loading paragraph={{rows: 1}} />
					<VipViewersLivestreamAction />
					<Skeleton active loading paragraph={{rows: 5}} />
				</Card>
			</>
		)

	const list = data.vip_viewers_livestream_tasks.edges
		.map(e => e.node)
		.filter(
			e =>
				e.id.includes(search) || e.name.trim().toLowerCase().includes(search),
		)
		.filter(e =>
			status_filter == 'active'
				? e.active == true
				: status_filter == 'will_expired'
					? e.livestream_nums - e.livestream_used_nums <= 5
					: status_filter == 'expired'
						? e.livestream_used_nums == e.livestream_nums
						: true,
		)

	return (
		<Card title={<BreadCrumb />} style={{minHeight: '100%'}}>
			<VipViewersLivestreamReport
				vips={data.vip_viewers_livestream_tasks.edges.map(e => e.node) ?? []}
				filter={status_filter}
				on_change={set_status_filter}
			/>
			<VipViewersLivestreamAction
				onChangeSearch={searchValue => set_search(searchValue)}
			/>
			<VipViewersLivestreamList data={list} />
		</Card>
	)
})
