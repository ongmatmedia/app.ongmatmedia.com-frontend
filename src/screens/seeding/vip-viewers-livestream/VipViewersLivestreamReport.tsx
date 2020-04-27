import { Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { VipViewersLivestream } from '../../../types'
import { StatictisCustom } from '../../../components/StatictisCustom'

export type VipViewersLivestreamReportStatusFilter =
	| 'all'
	| 'exprise_5_days'
	| 'active'
	| 'exprised'

export type VipViewersLivestreamReportProps = {
	vips: VipViewersLivestream[]
	filter: VipViewersLivestreamReportStatusFilter
	on_change: (status: VipViewersLivestreamReportStatusFilter) => any
}

export const VipViewersLivestreamReport = (
	props: VipViewersLivestreamReportProps,
) => {
	const { t } = useTranslation('vip_viewers_livestream')

	let totalIds = 0
	let willExpireTotalIds = 0
	let expiredTotalIds = 0
	let active = 0

	totalIds = props.vips.length
	for (const node of props.vips) {
	}

	return (
		<Row type="flex">
			<Col md={6} sm={8} xs={24}>
				<span onClick={() => props.on_change('all')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgb(24, 99, 175) 6%, rgb(109, 183, 247) 100%)"
						iconName="align-left"
						description={t('report.total_uids_description')}
						title={`${totalIds}`}
						active={props.filter == 'all'}
					/>
				</span>
			</Col>
			<Col md={6} sm={8} xs={24}>
				<span onClick={() => props.on_change('active')}>
					<StatictisCustom
						gradient="linear-gradient(to right, rgb(120, 158, 139), rgb(10, 143, 94), rgb(14, 89, 76))"
						iconName="check"
						description={t('report.active_description')}
						title={`${active}`}
						active={props.filter == 'active'}
					/>
				</span>
			</Col>
			<Col md={6} sm={8} xs={24}>
				<span onClick={() => props.on_change('exprise_5_days')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgba(250,117,22,1) 37%, rgba(251,193,131,1) 98%)"
						iconName="clock-circle"
						description={t('report.expire_in_5_days_description')}
						title={`${willExpireTotalIds}`}
						active={props.filter == 'exprise_5_days'}
					/>
				</span>
			</Col>
			<Col md={6} sm={8} xs={24}>
				<span onClick={() => props.on_change('exprised')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgba(250,79,22,1) 37%, rgba(251,132,131,1) 100%)"
						iconName="home"
						description={t('report.expired_description')}
						title={`${expiredTotalIds}`}
						active={props.filter == 'exprised'}
					/>
				</span>
			</Col>
		</Row>
	)
}
