import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Input, Icon, DatePicker } from 'antd'
import { debounce } from 'lodash'

export type PaymentListActionProps = {
	onChangeDate: (date: Date) => any
	onSearch: (search: string) => any
}

export const PaymentListAction = (props: PaymentListActionProps) => {
	const search = debounce(value => props.onSearch(value), 400)

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
					placeholder="Search UID, name, note"
					addonBefore={<Icon type="search" />}
					onChange={e => search(e.target.value)}
					allowClear
				/>
			</Col>
		</Row>
	)
}
