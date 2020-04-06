import { Layout } from 'antd'
import React from 'react'
import { Header } from './header'

export type MainLayoutProps = {
	Content: React.ComponentClass | React.FunctionComponent
	Menu?: React.ComponentClass | React.FunctionComponent
}

export const MainLayout = ({ Content }: MainLayoutProps): JSX.Element => {
	return (
		<Layout style={{ height: '100vh' }}>
			<Header />
			<Layout>
				<Layout style={{ flex: 1, padding: 10 }}>
					<Layout.Content>
						<Content />
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	)
}
