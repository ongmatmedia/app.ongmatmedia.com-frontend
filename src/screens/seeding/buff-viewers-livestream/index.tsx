import React from 'react'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { Card } from 'antd'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'
import { useTranslation } from 'react-i18next'

export const BuffViewersLivestream = () => {
	const { t, i18n } = useTranslation('buff_viewers_livestream')
	return (
		<Card title={t('title')}>
			<BuffViewersLivestreamAction onChangeSearch={() => {}} />
			<BuffViewersLivestreamList />
		</Card>
	)
}
