import { Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { VipViewersLivestream } from '../../../types'
import { StatictisCustom } from '../../../components/StatictisCustom'

export type VipViewersLivestreamReportStatusFilter =
	| 'all'
	| 'will_expired'
	| 'active'
	| 'expired'

export type VipViewersLivestreamReportProps = {
	vips: VipViewersLivestream[]
	filter: VipViewersLivestreamReportStatusFilter
	on_change: (status: VipViewersLivestreamReportStatusFilter) => any
}

export const VipViewersLivestreamReport = ({
	filter,
	on_change,
	vips,
}: VipViewersLivestreamReportProps) => {
	const { t } = useTranslation('vip_viewers_livestream')

	return (
		<Row type="flex" align="middle">
			<Col lg={6} sm={12} xs={24}>
				<span onClick={() => on_change('all')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgb(24, 99, 175) 6%, rgb(109, 183, 247) 100%)"
						iconName="align-left"
						description={t('report.total_uids_description')}
						title={`${vips.length}`}
						active={filter == 'all'}
					/>
				</span>
			</Col>
			<Col lg={6} sm={12} xs={24}>
				<span onClick={() => on_change('active')}>
					<StatictisCustom
						gradient="linear-gradient(to right, rgb(120, 158, 139), rgb(10, 143, 94), rgb(14, 89, 76))"
						iconName="check"
						description={t('report.active_description')}
						title={`${vips.filter(vip => vip.active).length}`}
						active={filter == 'active'}
					/>
				</span>
			</Col>
			<Col lg={6} sm={12} xs={24}>
				<span onClick={() => on_change('will_expired')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgba(250,117,22,1) 37%, rgba(251,193,131,1) 98%)"
						iconName="clock-circle"
						description={t('report.will_expired_description')}
						title={`${
							vips.filter(
								vip => vip.livestream_nums - vip.livestream_used_nums <= 5,
							).length
						}`}
						active={filter == 'will_expired'}
					/>
				</span>
			</Col>
			<Col lg={6} sm={12} xs={24}>
				<span onClick={() => on_change('expired')}>
					<StatictisCustom
						gradient="linear-gradient(90deg, rgba(250,79,22,1) 37%, rgba(251,132,131,1) 100%)"
						iconName="warning"
						description={t('report.expired_description')}
						title={`${
							vips.filter(
								vip => vip.livestream_used_nums == vip.livestream_nums,
							).length
						}`}
						active={filter == 'expired'}
					/>
				</span>
			</Col>
		</Row>
	)
}
