import { Card } from 'antd'
import React, { useState } from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { VipViewersLivestreamAction } from './VipViewersLivestreamAction'
import { VipViewersLivestreamList } from './VipViewersLivestreamList'

export const VipViewersLivestreamPage = () => {
	const [search, set_search] = useState<string>('')

	return (
		<Card title={<BreadCrumb />} style={{ minHeight: '100%' }}>
			<VipViewersLivestreamAction
				onChangeSearch={searchValue => set_search(searchValue)}
			/>
			<VipViewersLivestreamList search={search} />
		</Card>
	)
}
