import { Spin, Row, Col, Button, Alert, Tooltip } from 'antd'
import React from 'react'
import { TimeSeriesBlock } from '../../components/common/TimeSeriesBlock'
import { PaymentHistory } from '../../types'

export type PaymentListProps = {
	onLoadMore: Function
	has_more: boolean
	search: string
	payment_histories: PaymentHistory[]
	loading: boolean
	loading_more: boolean
}

export const PaymentList = (props: PaymentListProps) => (
	<>
		<Spin spinning={props.loading}>
			<TimeSeriesBlock data={props.payment_histories} />
		</Spin>
		{props.has_more && (
			<Row type="flex" justify="space-around" align="middle">
				<Col xs={24}>
					<Tooltip title={props.search ? "Kết quả tìm kiếm đang bị giới hạn bởi nội dung tìm kiếm, vui lòng xóa bộ lọc để hiển thị toàn bộ kết quả." : ''} trigger="click">
						<Button
							loading={props.loading_more}
							type="dashed"
							icon="vertical-align-bottom"
							style={{ margin: 10 }}
							onClick={() => props.onLoadMore()}
						>
							{props.loading ? 'Loading' : 'Show more'}
						</Button>
					</Tooltip>,
				</Col>
			</Row>
		)}
	</>
)
