import { Col, Icon, Row } from 'antd';
import React from 'react';
import { StatictisCustom } from '../../../components/StatictisCustom';
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream';

export const VipViewersLivestreamReport = (props: { vips: VIPViewersLivestream[] }) => {
  let totalIds = 0;
  let willExpireTotalIds = 0;
  let expiredTotalIds = 0;

  totalIds = props.vips.length;
  for (const node of props.vips) {
    if (Date.now() < node.end_time && node.end_time < Date.now() + 5 * 24 * 3600 * 1000) {
      willExpireTotalIds++;
      continue;
    }
    if (node.end_time < Date.now()) {
      expiredTotalIds++;
    }
  }

  return (
    <Row type="flex">
      <Col md={6} sm={8} xs={24} >
        <StatictisCustom gradient="linear-gradient(90deg, rgba(71,152,128,1) 6%, rgba(32,201,68,1) 100%)" iconName="home" description="Total UIDs" title={`${totalIds}`} />
      </Col >
      <Col md={6} sm={8} xs={24} >
        <StatictisCustom gradient="linear-gradient(90deg, rgba(250,117,22,1) 37%, rgba(251,193,131,1) 98%)" iconName="home" description="Expire 5 days" title={`${willExpireTotalIds}`} />
      </Col >
      <Col md={6} sm={8} xs={24} >
        <StatictisCustom gradient="linear-gradient(90deg, rgba(250,79,22,1) 37%, rgba(251,132,131,1) 100%)" iconName="home" description="Expired" title={`${expiredTotalIds}`} />
      </Col >
    </Row>
  )
}