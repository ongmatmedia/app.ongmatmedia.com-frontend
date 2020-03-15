import React from 'react'
import { Route } from 'react-router-dom'

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route
		{...rest}
		component={props => (
			<Layout>
				<Component {...props} />
			</Layout>
		)}
	/>
)

export { HashRouter as RouterSwitcher } from 'react-router-dom'
