import {Card, Alert, Skeleton} from 'antd'
import {graphql} from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {BreadCrumb} from '../../../components/common/BreadCrumb'
import {VipViewersLivestreamAction} from './VipViewersLivestreamAction'
import {VipViewersLivestreamList} from './VipViewersLivestreamList'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {VipViewersLivestreamConnection} from '../../../types'
import {VipViewersLivestreamReport, VipViewersLivestreamReportStatusFilter} from './VipViewersLivestreamReport'

const query = graphql`
	query VipViewersLivestreamQuery {
		vip_viewers_livestream_tasks {
			edges {
				node {
					id
					active
					name
					amount
					end_time
					max_duration
					max_live_per_day
					parallel
					created_time
					payment_history {
						time
						amount
						max_duration
						max_live_per_day
						parallel
						price
					}
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
			<Alert
				showIcon
				type="error"
				message={JSON.parse(error)?.errors[0].message}
			/>
		)
	}
	if (loading && !data && !error)
		return (
			<>
				<Card title={<BreadCrumb />} style={{height: "100%"}}>
					<Skeleton active loading paragraph={{rows: 2}} />
					<Skeleton active loading paragraph={{rows: 5}} />
				</Card>
			</>
		)
	const [search, set_search] = useState<string>('')
	const [status_filter, set_status_filter] = useState<
		VipViewersLivestreamReportStatusFilter
	>('all')

	const list = data.vip_viewers_livestream_tasks.edges
		.map(e => e.node)
		.filter(
			e =>
				e.id.includes(search) ||
				e.name.trim().toLowerCase().includes(search)
		)
		.filter(e => status_filter == "active"
			? e.active == true
			: status_filter == "expired_in_5_days"
				? Math.ceil((e.end_time - Date.now()) / 1000 / 86400) <= 5
				: status_filter == "expired"
					? e.end_time < Date.now()
					: true
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
