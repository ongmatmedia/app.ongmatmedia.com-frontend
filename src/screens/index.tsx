import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import { Error404Page } from '../components/common/Error404'
import { MainLayout } from '../layouts/main'
import { ProtectedRoute, withAppState } from '../store/App'
import { FacebookAccountsContainer } from './account/FacebookAccountsPage/FacebookAccountsContainer'
import { AgencyPage } from './agency'
import { AdminInformationPage } from './agency/AdminInformationPage'
import { BankInformationPage } from './agency/BankInformationPage'
import { CollaboratorSettingsPage } from './agency/CollaboratorSettingsPage'
import { CollaboratorsListPage } from './agency/CollaboratorsListPage'
import { SetDefaultPricePage } from './agency/SetDefaultPricePage'
import { AdminContact } from './contact/AdminContact'
import { DepositPage } from './deposit'
import { HomePage } from './HomePage'
import { NotificationPage } from './notification'
import { Payments } from './payments'
import { SeedingPage } from './seeding'
import { BuffViewers } from './seeding/buff-viewers'
import { BuffViewersLivestream } from './seeding/buff-viewers-livestream'
import { VipViewersLivestream } from './seeding/vip-viewers-livestream'
import { LoadingPage } from './loading/LoadingPage'

const LoginWrapper = ProtectedRoute(<LoadingPage />)

export const AppWithRouter = withAppState(() => {
	return (
		<HashRouter>
			<Switch>
				<LoginWrapper exact path="/">
					<MainLayout Content={() => <HomePage />} />
				</LoginWrapper>

				<LoginWrapper exact path="/seeding">
					<MainLayout Content={SeedingPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/seeding/vip-viewers-livestream">
					<MainLayout Content={VipViewersLivestream} />
				</LoginWrapper>

				<LoginWrapper exact path="/seeding/buff-viewers-livestream">
					<MainLayout Content={BuffViewersLivestream} />
				</LoginWrapper>

				<LoginWrapper exact path="/seeding/buff-viewers">
					<MainLayout Content={BuffViewers} />
				</LoginWrapper>

				<LoginWrapper exact path="/payments">
					<MainLayout Content={Payments} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency">
					<MainLayout Content={AgencyPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency/collaborators">
					<MainLayout Content={CollaboratorsListPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency/bank-information">
					<MainLayout Content={BankInformationPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency/default-price">
					<MainLayout Content={SetDefaultPricePage} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency/admin-information">
					<MainLayout Content={AdminInformationPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/agency/setting">
					<MainLayout Content={CollaboratorSettingsPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/deposit">
					<MainLayout Content={DepositPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/notification">
					<MainLayout Content={NotificationPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/contact">
					<MainLayout Content={AdminContact} />
				</LoginWrapper>

				{/* <LoginWrapper exact path="/livestream">
					<MainLayout Content={LivestreamPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/livestream/all-livestreams">
					<MainLayout Content={LivestreamsListPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/livestream/create-livestream">
					<MainLayout Content={CreateUpdateLivestreamPage} />
				</LoginWrapper>

				<LoginWrapper exact path="/livestream/update-livestream">
					<MainLayout Content={CreateUpdateLivestreamPage} />
				</LoginWrapper> */}

				{/* <LoginWrapper exact path="/farm">
					<MainLayout Content={AccountScreen} />
				</LoginWrapper> */}

				{/* <LoginWrapper exact path="/farm/facebook">
					<MainLayout Content={FacebookAccountsContainer} />
				</LoginWrapper> */}

				{/* <LoginWrapper exact path="/pricing">
					<MainLayout Content={PricingPage} />
				</LoginWrapper> */}

				<LoginWrapper>
					<Error404Page />
				</LoginWrapper>
			</Switch>
		</HashRouter>
	)
})
