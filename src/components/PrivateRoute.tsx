import React, { useEffect } from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import { useAuth0 } from '../context/Auth0'
import { MainLayoutProps } from '../layouts/main'
import { LoadingPage } from '../screens/loading/LoadingPage'

type PrivateRouteProps = RouteComponentProps & {
	component: React.FunctionComponent | React.ComponentClass
	layout: (props: MainLayoutProps) => JSX.Element
	path: string | string[]
	exact: boolean
}

const PrivateRoute = ({
	component: Component,
	path,
	exact = true,
	layout: Layout,
}: PrivateRouteProps): JSX.Element => {
	const { loading, isAuthenticated, loginWithRedirect, userToken } = useAuth0()

	useEffect(() => {
		if (loading || isAuthenticated) {
			return
		}
		const fn = async (): Promise<void> => {
			await loginWithRedirect({
				appState: { targetUrl: path },
			})
		}
		fn()
	}, [loading, isAuthenticated, loginWithRedirect, path, userToken])

	const render = (): JSX.Element | null =>
		isAuthenticated === true && userToken ? (
			<Layout Content={Component} />
		) : (
			<LoadingPage />
		)
	return <Route path={path} render={render} exact={exact} />
}

export default withRouter(PrivateRoute)
