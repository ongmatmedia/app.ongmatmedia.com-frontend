import { PaginationWrapper } from '../../graphql/GraphQLWrapper'
import { PaymentHistoryConnection } from '../../types'
import { Row, Card, Spin, Button } from 'antd'
import React, { useState } from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { PaymentListAction } from './PaymentListAction'
import { PaymentList } from './PaymentList'

const query = graphql`
	query PaymentsQuery($after: String, $first: Int, $before_time: Long) {
		...Payments_payment_histories @arguments(after: $after, first: $first, before_time: $before_time)
	}
`

export const Payments = PaginationWrapper<
  {
    payment_histories: PaymentHistoryConnection
  }>(
    query,
    graphql`
		fragment Payments_payment_histories on Query
			@argumentDefinitions(after: { type: "String" }, first: { type: "Int" }, before_time: { type: "Long" }) {
			payment_histories(first: $first, after: $after, before_time: $before_time)
				@connection(key: "PaymentPage_payment_histories") {
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
    {},
    props => {
      const [search, set_search] = useState<string>('')
      const paymentHistories = props.data?.payment_histories.edges.map(e => e.node)

      return (
        <Card
          title={
            <BreadCrumb />
          }
          size="small"
        >
          <PaymentListAction
            onChangeDate={d => props.reload({ first: 12, before_time: d.getTime() })}
            onSearch={set_search}
          />
          {
            !!paymentHistories && (
              <PaymentList
                search={search}
                has_more={props.has_more()}
                onLoadMore={() => props.load_more(100)}
                payment_histories={[
                  ...paymentHistories.filter(payment => payment.note.trim().toLocaleLowerCase().includes(search)),
                  ...paymentHistories.filter(payment => payment.receiver_username.trim().toLocaleLowerCase().includes(search)),
                  ...paymentHistories.filter(payment => payment.sender_username.trim().toLocaleLowerCase().includes(search))
                ]}
                loading={props.loading}
                loading_more={props.loading_more}
              />
            )
          }
        </Card>
      )
    },
  )


