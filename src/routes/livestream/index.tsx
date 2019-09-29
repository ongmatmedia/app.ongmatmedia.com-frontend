import React from 'react'
import { LivestreamListAction } from './LivestreamListAction'
import { LivestreamList } from './LivestreamList'

export const LivestreamPage = () => (
    <span>
        <LivestreamListAction />
        <LivestreamList />
    </span>
)