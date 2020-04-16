import { DatePicker } from 'antd'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Select from 'antd/lib/select'
import React, { useState } from 'react'
import 'react-tiny-fab/dist/styles.css'

const { Option } = Select

export type LivestreamActionsProps = {
	onChangeSearch: (v: string) => any
	onChangeDate: (date: Date) => any
	onChangeStatusFilter: (value: string) => void
}

export const LivestreamActions = (props: LivestreamActionsProps) => {
	const [search, set_search] = useState<string>('')

	return (
		<Row style={{ marginBottom: 10 }} gutter={16}>
			<Col
				xs={12}
				sm={{ span: 6, offset: 8 }}
				style={{ textAlign: 'right', marginTop: 15 }}
			>
				<Select
					defaultValue="Filter by status"
					onChange={props.onChangeStatusFilter}
				>
					<Option value={null} key={4}>
						No filter
					</Option>
					<Option value="created" key={1}>
						Created
					</Option>
					<Option value="playing" key={2}>
						Playing
					</Option>
					<Option value="done" key={1}>
						Done
					</Option>
				</Select>
			</Col>
			<Col xs={12} sm={{ span: 4 }} style={{ marginTop: 15 }}>
				<DatePicker
					onChange={d =>
						props.onChangeDate(new Date(d ? d.valueOf() : Date.now()))
					}
				/>
			</Col>
			<Col xs={24} sm={6} style={{ paddingBottom: 5, marginTop: 15 }}>
				<Input
					placeholder="Campaign's name, title or description"
					allowClear
					value={search}
					onChange={e => {
						set_search(e.target.value)
						props.onChangeSearch(e.target.value.trim().toLocaleLowerCase())
					}}
				/>
			</Col>
		</Row>
	)
}
