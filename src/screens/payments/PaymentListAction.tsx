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

export const PaymentListAction = (props: PaymentListActionProps) =>
{
	const search = (value: string) =>
		props.onSearch(value.trim().toLocaleLowerCase())

	return (
		<Row
			type="flex"
			justify="end"
			align="middle"
			style={{paddingBottom: 10}}
			gutter={16}
		>
			<Col xs={24} sm={8} md={6} style={{marginTop: 10}}>
				<DatePicker
					onChange={d =>
						props.onChangeDate(new Date(d ? d.valueOf() : Date.now()))
					}
					style={{width: "100%"}}
				/>
			</Col>

			<Col xs={24} sm={8} md={6} style={{marginTop: 10}}>
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
