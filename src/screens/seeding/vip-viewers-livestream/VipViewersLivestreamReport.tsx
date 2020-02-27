import { Col, Icon, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VipViewersLivestream } from '../../../types';

export type VipViewersLivestreamReportStatusFilter =
  | 'all'
  | 'exprise_5_days'
  | 'active'
  | 'exprised';

export type VipViewersLivestreamReportProps = {
  vips: VipViewersLivestream[];
  filter: VipViewersLivestreamReportStatusFilter;
  on_change: (status: VipViewersLivestreamReportStatusFilter) => any;
};

export const VipViewersLivestreamReport = (props: VipViewersLivestreamReportProps) => {
  const { t, i18n } = useTranslation('vip_viewers_livestream');

  let totalIds = 0;
  let willExpireTotalIds = 0;
  let expiredTotalIds = 0;
  let active = 0;

  totalIds = props.vips.length;
  for (const node of props.vips) {

  }

  return (
    <Row type="flex">

    </Row>
  );
};
