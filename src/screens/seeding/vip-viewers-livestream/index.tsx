import React, { useState } from 'react';
import { VipViewersLivestreamAction } from './VipViewersLivestreamAction';
import { Card } from 'antd';
import { VipViewersLivestreamList } from './VipViewersLivestreamList';
import { useTranslation } from 'react-i18next';

export const VipViewersLivestream = () => {
  const [search, set_search] = useState<string>('');
  const { t } = useTranslation('vip_page');

  return (
    <Card title={t('vip_page:title')}>
      <VipViewersLivestreamAction onChangeSearch={set_search} />
      <VipViewersLivestreamList search={search} />
    </Card>
  );
};
