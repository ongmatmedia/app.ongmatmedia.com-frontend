import React from 'react'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { Card } from 'antd'
import { BuffViewersLivestreamAction } from './BuffViewersLivestreamAction'

export const BuffViewersLivestream = () => (
    <Card title="Buff viewers livestream">
        <BuffViewersLivestreamAction onChangeSearch={() => { }} />
        <BuffViewersLivestreamList />
    </Card>
)