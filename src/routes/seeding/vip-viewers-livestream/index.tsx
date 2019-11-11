import React from 'react'
import { VipViewersLivestreamAction } from './VipViewersLivestreamAction'
import { Card } from 'antd'
import { VipViewersLivestreamList } from './VipViewersLivestreamList'

export const VipViewersLivestream = () => (
    <Card title="Vip viewers livestream">
        <VipViewersLivestreamAction />
        <VipViewersLivestreamList />
        
    </Card>
)