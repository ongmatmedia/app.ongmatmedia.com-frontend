import Col from 'antd/lib/col'
import DatePicker from 'antd/lib/date-picker'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import React from 'react'

export type PaymentListActionProps = {
	onChangeDate: (date: Date) => any
	onSearch: (search: string) => any
}

export const PaymentListAction = (props: PaymentListActionProps) => {
	const search = (value: string) =>
		props.onSearch(value.trim().toLocaleLowerCase())

	return (
		<Row
			type="flex"
			justify="space-between"
			align="middle"
			style={{ paddingTop: 10, paddingBottom: 10 }}
		>
			<Col md={6} span={12}>
				<DatePicker
					onChange={d =>
						props.onChangeDate(new Date(d ? d.valueOf() : Date.now()))
					}
				/>
			</Col>

			<Col md={6} xs={12}>
				<Input
					placeholder="Search by username or note"
					addonBefore={<Icon type="search" />}
					onChange={e => search(e.target.value)}
					allowClear
				/>
			</Col>
		</Row>
	)
}
