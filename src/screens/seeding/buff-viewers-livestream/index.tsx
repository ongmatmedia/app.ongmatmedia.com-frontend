import { Card } from 'antd'
import React, { useState } from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { BuffViewersLivetreamStatistics } from './BuffViewersLivetreamStatistics'

export const BuffViewersLivestream = () => {
	const [videoIdSearch, setVideoIdSearch] = useState<string>()

	return (
		<Card title={<BreadCrumb />}>
			<BuffViewersLivetreamStatistics />
			<BuffViewersLivestreamAction
				onChangeSearch={id => setVideoIdSearch(id)}
			/>
			<BuffViewersLivestreamList videoIdSearch={videoIdSearch} />
		</Card>
	)
}
