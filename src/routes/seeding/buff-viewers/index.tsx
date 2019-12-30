import { Card } from 'antd'
import React from 'react'
import { BuffViewersAction } from './BuffViewersAction'
import { BuffViewersList } from './BuffViewersList'

export const BuffViewers = () => (
  <Card title="Buff viewers video">
    <BuffViewersAction onChangeSearch={() => { }} />
    <BuffViewersList />
  </Card>
)