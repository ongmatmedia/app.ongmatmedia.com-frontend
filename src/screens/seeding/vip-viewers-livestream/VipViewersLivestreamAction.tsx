import { Button, Col, Icon, Input, notification, Row } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FacebookAccount } from '../../../api/FacebookAccount'
import { CUModal } from './CUModal'

export type VipViewersLivestreamActionProps = {
	onChangeSearch: (v: string) => any
}

export const VipViewersLivestreamAction = (
	props: VipViewersLivestreamActionProps,
) => {
	const [CU_modal_visible, set_CU_modal_visible] = useState<boolean>(false)
	const [search, set_search] = useState<string>('')
	const [loading_uid, set_loading_uid] = useState<boolean>(false)

	const { t, i18n } = useTranslation('vip_viewers_livestream')

	const load_uid = async function () {
		try {
			set_loading_uid(true)
			const { uid } = await FacebookAccount.getUIDFromURL(search)
			set_search(uid)
			props.onChangeSearch(uid)
		} catch (e) {
			notification.error({ message: 'Can not get UID' })
		}
		set_loading_uid(false)
	}

	return (
		<Row
			type="flex"
			align="middle"
			justify="space-between"
			style={{ marginBottom: 10 }}
		>
			{CU_modal_visible && (
				<CUModal onClose={() => set_CU_modal_visible(false)} mode="create" />
			)}
			<Col style={{ paddingBottom: 5 }}>
				<Button
					type="primary"
					icon="plus"
					onClick={() => set_CU_modal_visible(true)}
				>
					{t('action.add_button')}
				</Button>
			</Col>
			<Col xs={24} md={12} xxl={8} style={{ paddingBottom: 5 }}>
				<Input
					addonAfter={
						<Icon
							type={loading_uid ? 'loading' : 'search'}
							onClick={load_uid}
						/>
					}
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
