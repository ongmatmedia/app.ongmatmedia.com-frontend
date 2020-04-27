import React, { useState } from 'react'
import { VipViewersLivestreamAction } from './VipViewersLivestreamAction'
import { Card } from 'antd'
import { VipViewersLivestreamList } from './VipViewersLivestreamList'
import { useTranslation } from 'react-i18next'
import { BreadCrumb } from '../../../components/common/BreadCrumb'

export const VipViewersLivestreamPage = () => {
	const [search, set_search] = useState<string>('')
	const { t } = useTranslation('vip_page')

	return (
		<Card title={<BreadCrumb />}>
			<VipViewersLivestreamAction onChangeSearch={set_search} />
			<VipViewersLivestreamList search={search} />
		</Card>
	)
}
