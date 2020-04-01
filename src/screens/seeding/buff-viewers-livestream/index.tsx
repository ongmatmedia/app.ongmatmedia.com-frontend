import { Card } from 'antd'
import React, { useState } from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { BuffViewersLivetreamStatistics } from './BuffViewersLivetreamStatistics'

export const BuffViewersLivestream = () => (
	<Card title={<BreadCrumb />}>
		<BuffViewersLivestreamList />
	</Card>
)
