import { Col, DatePicker, Icon, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Fab } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'
import { BuffViewersLivestreamCreateModal } from './BuffViewersLivestreamCreateModal'

export type BuffViewersLivestreamActionProps = {
	onChangeSearch: (v: string) => any
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
		<Row
			style={{ marginBottom: 10 }}
			gutter={12}
		>
			{create_modal_visible && (
				<BuffViewersLivestreamCreateModal
					onClose={() => set_create_modal_visible(false)}
				/>
			)}
			{!create_modal_visible && (
				<Fab
					mainButtonStyles={{ backgroundColor: 'rgb(64, 169, 255)' }}
					icon={<Icon type="plus" />}
					event='click'
					onClick={() => set_create_modal_visible(true)}
				>
				</Fab>
			)}
			<Col xs={12} sm={{ span: 4, offset: 12 }}>
				<DatePicker onChange={(date, dateString) => console.log(date)} />
			</Col>
			<Col xs={12} sm={8} style={{ paddingBottom: 5 }}>
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
