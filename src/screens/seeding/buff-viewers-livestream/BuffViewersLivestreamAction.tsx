import { Col, DatePicker, Icon, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Fab } from 'react-tiny-fab'
import { BuffViewersLivestreamCreateModal } from './BuffViewersLivestreamCreateModal'
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
	const [create_modal_visible, set_create_modal_visible] = useState<boolean>(
		false,
	)
	const [search, set_search] = useState<string>('')

	const { t, i18n } = useTranslation('buff_viewers_livestream')

	return (
		<Row style={{ marginBottom: 10 }} gutter={16}>
			{create_modal_visible && (
				<BuffViewersLivestreamCreateModal
					onClose={() => set_create_modal_visible(false)}
				/>
			)}
			{!create_modal_visible && (
				<Fab
					mainButtonStyles={{ backgroundColor: 'rgb(64, 169, 255)' }}
					icon={<Icon type="plus" />}
					event="click"
					onClick={() => set_create_modal_visible(true)}
				></Fab>
			)}
			<Col
				xs={12}
				sm={{ span: 6, offset: 8 }}
				style={{ textAlign: 'right', marginTop: 15 }}
			>
				<Select
					defaultValue="Filter by status"
					onChange={props.onChangeStatusFilter}
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
			<Col xs={12} sm={{ span: 4 }} style={{ marginTop: 15 }}>
				<DatePicker
					onChange={d =>
						props.onChangeDate(new Date(d ? d.valueOf() : Date.now()))
					}
				/>
			</Col>
			<Col xs={24} sm={6} style={{ paddingBottom: 5, marginTop: 15 }}>
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
