import { DatePicker } from 'antd'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Select from 'antd/lib/select'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-tiny-fab/dist/styles.css'

const { Option } = Select

export type BuffViewersLivestreamActionProps = {
	onChangeSearch: (v: string) => any
	onChangeDate: (date: Date) => any
	onChangeStatusFilter: (value: string) => void
}

export const BuffViewersLivestreamAction = (
	props: BuffViewersLivestreamActionProps,
) => {
	const [search, set_search] = useState<string>('')

	const { t, i18n } = useTranslation('buff_viewers_livestream')

	return (
		<Row style={{ marginBottom: 10 }} gutter={16}>
			<Col
				xs={12}
				sm={8}
				md={{ span: 6, offset: 6 }}
				lg={{ span: 4, offset: 12 }}
				style={{ textAlign: 'right', marginTop: 15 }}
			>
				<Select
					defaultValue="Filter by status"
					onChange={props.onChangeStatusFilter}
					style={{ width: '100%' }}
				>
					<Option value="" key={5}>
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
					<Option value="fail" key={3}>
						Fail
					</Option>
				</Select>
			</Col>
			<Col xs={12} sm={8} md={6} lg={4} style={{ marginTop: 15 }}>
				<DatePicker
					onChange={d =>
						props.onChangeDate(new Date(d ? d.valueOf() : Date.now()))
					}
					style={{ width: '100%' }}
				/>
			</Col>
			<Col
				xs={24}
				sm={8}
				md={6}
				lg={4}
				style={{ paddingBottom: 5, marginTop: 15 }}
			>
				<Input
					placeholder={t('action.search_placeholder')}
					allowClear
					value={search}
					onChange={e => {
						set_search(e.target.value)
						props.onChangeSearch(e.target.value.toLowerCase())
					}}
				/>
			</Col>
		</Row>
	)
}
