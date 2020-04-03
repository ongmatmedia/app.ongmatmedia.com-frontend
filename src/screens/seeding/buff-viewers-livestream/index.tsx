import { Card } from 'antd'
import React from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'

export const BuffViewersLivestream = () => (
	<Card title={<BreadCrumb />}>
		<BuffViewersLivestreamList />
	</Card>
)
