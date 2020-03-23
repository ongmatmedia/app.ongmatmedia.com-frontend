import { Spin, Row, Col, Button } from 'antd'
import React from 'react'
import { TimeSeriesBlock } from '../../components/common/TimeSeriesBlock'
import { PaymentHistory } from '../../types'

export type PaymentListProps = {
	onLoadMore: Function
	has_more: boolean
	search: string
	payment_histories: PaymentHistory[]
	loading: boolean
}

export const PaymentList = (props: PaymentListProps) => (
	<>
		<Spin spinning={props.loading}>
			<TimeSeriesBlock data={props.payment_histories} />
		</Spin>
		{props.has_more && (
			<Row type="flex" justify="space-around" align="middle">
				<Col>
					<Button
						loading={props.loading}
						type="dashed"
						icon="vertical-align-bottom"
						style={{ margin: 10 }}
						onClick={() => props.onLoadMore()}
					>
						{props.loading ? 'Loading' : 'Show more'}
					</Button>
				</Col>
			</Row>
		)}
	</>
)
