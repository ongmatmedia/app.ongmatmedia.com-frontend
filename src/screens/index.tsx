import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Error404Page } from '../components/common/Error404'
import PrivateRoute from '../components/PrivateRoute'
import history from '../helpers/history'
import { MainLayout } from '../layouts/main'
import { AgencyPage } from './agency'
import { AdminInformationPage } from './agency/AdminInformationPage'
import { BankInformationPage } from './agency/BankInformationPage'
import { CollaboratorsListPage } from './agency/CollaboratorsListPage'
import { SetDefaultPricePage } from './agency/SetDefaultPricePage'
import { AdminContact } from './contact/AdminContact'
import { DepositPage } from './deposit'
import { HomePage } from './HomePage'
import { NotificationPage } from './notification'
import { Payments } from './payments/Payments'
// import { Payments } from './payments'
import { SeedingPage } from './seeding'
import { BuffViewers } from './seeding/buff-viewers'
import { BuffViewersLivestream } from './seeding/buff-viewers-livestream'

export const AppWithRouter = () => {
	return (
		<Router history={history}>
			<Switch>
				<PrivateRoute exact component={HomePage} layout={MainLayout} path="/" />

				<PrivateRoute
					exact
					component={SeedingPage}
					layout={MainLayout}
					path="/seeding"
				/>
				<PrivateRoute
					exact
					component={BuffViewersLivestream}
					layout={MainLayout}
					path="/seeding/buff-viewers-livestream"
				/>
				<PrivateRoute
					exact
					component={BuffViewers}
					layout={MainLayout}
					path="/seeding/buff-viewers"
				/>

				<PrivateRoute
					exact
					component={Payments}
					layout={MainLayout}
					path="/payments"
				/>

				<PrivateRoute
					exact
					component={AgencyPage}
					layout={MainLayout}
					path="/agency"
				/>
				<PrivateRoute
					exact
					component={CollaboratorsListPage}
					layout={MainLayout}
					path="/agency/collaborators"
				/>
				<PrivateRoute
					exact
					component={BankInformationPage}
					layout={MainLayout}
					path="/agency/bank-information"
				/>
				<PrivateRoute
					exact
					component={SetDefaultPricePage}
					layout={MainLayout}
					path="/agency/default-price"
				/>
				<PrivateRoute
					exact
					component={AdminInformationPage}
					layout={MainLayout}
					path="/agency/admin-information"
				/>
				{/* <PrivateRoute exact component={CollaboratorSettingsPage} layout={MainLayout} path="/agency/setting" /> */}

				<PrivateRoute
					exact
					component={DepositPage}
					layout={MainLayout}
					path="/deposit"
				/>

				<PrivateRoute
					exact
					component={NotificationPage}
					layout={MainLayout}
					path="/notification"
				/>

				<PrivateRoute
					exact
					component={AdminContact}
					layout={MainLayout}
					path="/contact"
				/>

				{/* <PrivateRoute exact component={LivestreamPage} layout={MainLayout} path="/livestream" />
				<PrivateRoute exact component={LivestreamsListPage} layout={MainLayout} path="/livestream/all-livestream" />
				<PrivateRoute exact component={CreateUpdateLivestreamPage} layout={MainLayout} path="/livestream/create-livestream" />
				<PrivateRoute exact component={CreateUpdateLivestreamPage} layout={MainLayout} path="/livestream/update-livestream" />
				<PrivateRoute exact component={CreateUpdateLivestreamPage} layout={MainLayout} path="/livestream/pricing" /> */}

				{/* <PrivateRoute exact component={AccountScreen} layout={MainLayout} path="/farm" /> */}

				<Route>
					<Error404Page />
				</Route>
			</Switch>
		</Router>
	)
}
