import Layout from 'antd/lib/layout'
import React from 'react'
import { TopBar } from '../../components/common/TopBar'

export const Header = () => (
	<Layout.Header
		style={{
			height: 55,
			background: 'linear-gradient(to right, #2574a8, #514a9d)',
			padding: 0,
		}}
	>
		<TopBar />
	</Layout.Header>
)
