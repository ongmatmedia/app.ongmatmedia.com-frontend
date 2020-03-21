import React from 'react'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { Card } from 'antd'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { useTranslation } from 'react-i18next'
import { BuffViewersLivestreamSystemStatus } from './BuffViewersLivestreamSystemStatus'
import { BreadCrumb } from '../../../components/common/BreadCrumb'

export const BuffViewersLivestream = () => {
	const { t, i18n } = useTranslation('buff_viewers_livestream')
	return (
		<Card
			title={
				<BreadCrumb
					routes={[
						{
							path: '/',
							breadcrumbName: 'Home',
						},
						{
							path: '/seeding',
							breadcrumbName: 'Seeding',
						},
						{
							path: '/seeding/buff-viewers-livestream',
							breadcrumbName: 'Buff viewers livestream',
						},
					]}
				/>
			}
		>
			<BuffViewersLivestreamAction onChangeSearch={() => {}} />
			<BuffViewersLivestreamSystemStatus />
			<BuffViewersLivestreamList />
		</Card>
	)
}
