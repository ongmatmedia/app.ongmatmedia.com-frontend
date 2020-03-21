import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Error404Page } from '../components/common/Error404'
import { AuthLayout } from '../layouts/auth'
import { MainLayout } from '../layouts/main'
import { ProtectedRoute, withAppState } from '../store/App'
import { AccountScreen } from './account'
import { AgencyPage } from './agency'
import { Login, ResetPassword } from './auth'
import { SetNewPasswordPage } from './auth/set-new-pass'
import { DepositPage } from './deposit'
import { HomePage } from './HomePage'
import { LivestreamTabs } from './livestream'
import { Payments } from './payments'
import { SeedingPage } from './seeding'
import { BuffViewers } from './seeding/buff-viewers'
import { BuffViewersLivestream } from './seeding/buff-viewers-livestream'
import { VipViewersLivestream } from './seeding/vip-viewers-livestream'

export const AppWithRouter = withAppState(props => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/auth/login">
					<AuthLayout Content={Login} />
				</Route>

				<Route exact path="/auth/set-new-password">
					<AuthLayout Content={SetNewPasswordPage} />
				</Route>

				<Route exact path="/auth/reset-password">
					<AuthLayout Content={ResetPassword} />
				</Route>

				<ProtectedRoute exact path="/">
					<MainLayout Content={() => <HomePage />} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/accounts">
					<MainLayout Content={AccountScreen} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/seeding">
					<MainLayout Content={SeedingPage} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/seeding/vip-viewers-livestream">
					<MainLayout Content={VipViewersLivestream} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/seeding/buff-viewers-livestream">
					<MainLayout Content={BuffViewersLivestream} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/seeding/buff-viewers">
					<MainLayout Content={BuffViewers} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/payments">
					<MainLayout Content={Payments} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/agency">
					<MainLayout Content={AgencyPage} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/deposit">
					<MainLayout Content={DepositPage} />
				</ProtectedRoute>

				<ProtectedRoute exact path="/livestream">
					<MainLayout Content={LivestreamTabs} />
				</ProtectedRoute>

				<ProtectedRoute>
					<Error404Page />
				</ProtectedRoute>

				<Route>
					<Error404Page />
				</Route>
			</Switch>
		</HashRouter>
	)
})
