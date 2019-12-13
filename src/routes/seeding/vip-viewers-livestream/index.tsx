import React, { useState } from 'react'
import { VipViewersLivestreamAction } from './VipViewersLivestreamAction'
import { Card } from 'antd'
import { VipViewersLivestreamList } from './VipViewersLivestreamList'
import { VipViewersLivestreamReport } from './VipViewersLivestreamReport'

export const VipViewersLivestream = () => {
    const [search, set_search] = useState<string>('')
    return (
        <Card title="Vip viewers livestream">
            <VipViewersLivestreamAction onChangeSearch={set_search} />
            <VipViewersLivestreamList search={search}/>
        </Card>
    )
}