import React from 'react'
import {Redirect, Router, Switch} from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import history from '../helpers/history'
import {MainLayout} from '../layouts/main'
import {AccountScreen} from './account'
import {FacebookAccountsContainer} from './account/FacebookAccountsPage/FacebookAccountsContainer'
import {AgencyPage} from './agency'
import {AdminInformationPage} from './agency/AdminInformationPage'
import {BankInformationPage} from './agency/BankInformationPage'
import {CollaboratorsListPage} from './agency/CollaboratorsListPage'
import {SetDefaultPricePage} from './agency/SetDefaultPricePage'
import {AdminContact} from './contact/AdminContact'
import {DepositPage} from './deposit'
import HomePage from './HomePage'
import {LivestreamsListPage} from './livestream'
import {CreateUpdateLivestreamPage} from './livestream/CreateUpdateLivestreamPage/CreateUpdateLivestreamPage'
import {DetailLivestreamPage} from './livestream/DetailLivestreamPage'
import {PricingPage} from './livestream/LivestreamPricingPage/LivestreamPricingPage'
import {NotificationPage} from './notification'
import {Payments} from './payments/Payments'
import {SeedingPage} from './seeding'
import {BuffViewersLivestream} from './seeding/buff-viewers-livestream'
import {VipViewersLivestreamPage} from './seeding/vip-viewers-livestream'
import {FriendsFiltering} from './tools/friends-filtering/FriendsFiltering'
import {FriendsPoking} from './tools/friends-poking/FriendsPoking'
import {Tools} from './tools/Tools'

export const AppWithRouter = () =>
{
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
					component={VipViewersLivestreamPage}
					layout={MainLayout}
					path="/seeding/vip-viewers-livestream"
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

				<PrivateRoute
					exact
					component={LivestreamsListPage}
					layout={MainLayout}
					path="/livestream"
				/>
				<PrivateRoute
					exact
					component={CreateUpdateLivestreamPage}
					layout={MainLayout}
					path="/livestream/create-livestream"
				/>
				<PrivateRoute
					exact
					component={CreateUpdateLivestreamPage}
					layout={MainLayout}
					path="/livestream/update-livestream"
				/>
				<PrivateRoute
					exact
					component={DetailLivestreamPage}
					layout={MainLayout}
					path="/livestream/detail-livestream"
				/>
				<PrivateRoute
					exact
					component={PricingPage}
					layout={MainLayout}
					path="/livestream/pricing"
				/>

				<PrivateRoute
					exact
					component={AccountScreen}
					layout={MainLayout}
					path="/farm"
				/>
				<PrivateRoute
					exact
					component={FacebookAccountsContainer}
					layout={MainLayout}
					path="/farm/facebook"
				/>

				<PrivateRoute
					exact
					component={Tools}
					layout={MainLayout}
					path="/tools"
				/>

				<PrivateRoute
					exact
					component={FriendsFiltering}
					layout={MainLayout}
					path="/tools/filter-friends"
				/>

				<PrivateRoute
					exact
					component={FriendsPoking}
					layout={MainLayout}
					path="/tools/poke-friends"
				/>

				<Redirect to="/" />
			</Switch>
		</Router>
	)
}
