import Alert from 'antd/lib/alert'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import { graphql } from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { PaginationWrapper } from '../../graphql/GraphQLWrapper'
import { PaymentHistoryConnection } from '../../types'
import { PaymentList } from './PaymentList'
import { PaymentListAction } from './PaymentListAction'

const query = graphql`
	query PaymentsQuery($after: String, $first: Int, $before_time: Long) {
		...Payments_payment_histories
			@arguments(after: $after, first: $first, before_time: $before_time)
	}
`

export const Payments = PaginationWrapper<{
	payment_histories: PaymentHistoryConnection
}>(
	query,
	graphql`
		fragment Payments_payment_histories on Query
			@argumentDefinitions(
				after: { type: "String" }
				first: { type: "Int" }
				before_time: { type: "Long" }
			) {
			payment_histories(
				first: $first
				after: $after
				before_time: $before_time
			) @connection(key: "PaymentPage_payment_histories") {
				edges {
					node {
						id
						time
						total
						sender_username
						sender_id
						receiver_username
						service
						receiver_id
						balance_after
						note
					}
				}
			}
		}
	`,
	{
		first: 10,
	},
	props => {
		if (props.error || props.loading)
			return (
				<Card style={{ height: '100%' }} title={<BreadCrumb />} size="small">
					<Row type="flex" justify="space-around" style={{ height: '100%' }}>
						<Col>
							{props.error && (
								<Alert showIcon message={props.error} type="error" />
							)}
							{!props.error && props.loading && (
								<Spin
									indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
								/>
							)}
						</Col>
					</Row>
				</Card>
			)
		const [search, set_search] = useState<string>(null)
		const paymentHistories = props.data?.payment_histories.edges.map(
			e => e.node,
		)

		return (
			<Card title={<BreadCrumb />} size="small">
				<PaymentListAction
					onChangeDate={d =>
						props.reload({ first: 12, before_time: d.getTime() })
					}
					onSearch={set_search}
				/>
				{!!paymentHistories && (
					<PaymentList
						search={search}
						has_more={props.has_more()}
						onLoadMore={() => props.load_more(100)}
						payment_histories={
							search
								? [
										...paymentHistories.filter(
											payment =>
												payment.note
													?.trim()
													.toLocaleLowerCase()
													.includes(search) ||
												payment.receiver_username
													?.trim()
													.toLocaleLowerCase()
													.includes(search) ||
												payment.sender_username
													?.trim()
													.toLocaleLowerCase()
													.includes(search),
										),
								  ]
								: [...paymentHistories]
						}
						loading={props.loading}
						loading_more={props.loading_more}
					/>
				)}
			</Card>
		)
	},
)
