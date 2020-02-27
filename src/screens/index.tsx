import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { AuthLayout } from '../layouts/auth';
import { MainLayout } from '../layouts/main';
// import { AccountPage } from './account';
// import { AgencyPage } from './agency';
// import { Login, ResetPassword } from './auth';
// import { SetNewPasswordPage } from './auth/set-new-pass';
// import { DepositPage } from './deposit';
import { HomePage } from './HomePage';
// import { LivestreamPage } from './livestream/list';
// import { LivestreamMenu } from './livestream/LivestreamMenu';
// import { LivestreamSubscriptionPage } from './livestream/subscription';
// import { Payments } from './payments';
// import { SeedingMenuContent, SeedingPage } from './seeding';
// import { BuffViewers } from './seeding/buff-viewers';
// import { BuffViewersLivestream } from './seeding/buff-viewers-livestream';
// import { VipViewersLivestream } from './seeding/vip-viewers-livestream';

export const AppWithRouter = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <MainLayout Content={() => <HomePage />} />
      </Route>

      {/* <Route exact path="/auth/login">
        <AuthLayout Content={Login} />
      </Route>

      <Route exact path="/auth/set-new-password">
        <AuthLayout Content={SetNewPasswordPage} />
      </Route>

      <Route exact path="/auth/reset-password">
        <AuthLayout Content={ResetPassword} />
      </Route>

      <Route exact path="/accounts">
        <MainLayout Content={AccountPage} />
      </Route>

      <Route exact path="/seeding">
        <MainLayout Content={SeedingPage} />
      </Route>

      <Route exact path="/seeding/vip-viewers-livestream">
        <MainLayout Content={VipViewersLivestream} />
      </Route>

      <Route exact path="/seeding/buff-viewers-livestream">
        <MainLayout Content={BuffViewersLivestream} />
      </Route>

      <Route exact path="/seeding/buff-viewers">
        <MainLayout Content={BuffViewers} />
      </Route>

      <Route exact path="/payments">
        <MainLayout Content={Payments} />
      </Route>

      <Route exact path="/livestream">
        <MainLayout Content={LivestreamPage} Menu={LivestreamMenu} />
      </Route>

      <Route exact path="/livestream/subscription">
        <MainLayout Content={LivestreamSubscriptionPage} Menu={LivestreamMenu} />
      </Route>

      <Route exact path="/agency">
        <MainLayout Content={AgencyPage} />
      </Route>

      {/* <Route exact path="/agency/update-price" >
        <MainLayout Content={UpdatePrice} Menu={AgencyMenu} />
      </Route> 

      <Route exact path="/deposit">
        <MainLayout Content={DepositPage} />
      </Route>

      <Route>
        <span>Not found</span>
      </Route>

      */}
    </Switch>
  </HashRouter>
);
