import React, { useState } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MainLayout } from '../containers/main';
import { SeedingPage, SeedingMenuContent } from './seeding'
import { LivestreamPage } from './livestream/list';
import { AuthLayout } from '../containers/auth';
import { Login, ResetPassword } from './auth';
import { AccountPage } from './account'
import { SetNewPasswordPage } from './auth/set-new-pass';
import { LivestreamSubscriptionPage } from './livestream/subscription';
import { LivestreamMenu } from './livestream/LivestreamMenu'
import { AgencyPage } from './agency';
import { VipViewersLivestream } from './seeding/vip-viewers-livestream'
import { BuffViewersLivestream } from './seeding/buff-viewers-livestream'
import { Payments } from './payments'
import { DepositPage } from './deposit'
import { HomePage } from './HomePage'
import { UpdatePrice } from './agency/UpdatePrice';
import { AgencyMenu } from './agency/AgencyMenu';
import { BuffViewers } from './seeding/buff-viewers';

export const AppWithRouter = () => (
  <HashRouter>
    <Switch>

      <Route exact path="/">
        <MainLayout Content={() => <HomePage />} />
      </Route>

      <Route exact path="/auth/login">
        <AuthLayout Content={Login} />
      </Route>

      <Route exact path="/auth/set-new-password">
        <AuthLayout Content={SetNewPasswordPage} />
      </Route>

      <Route exact path="/auth/reset-password">
        <AuthLayout Content={ResetPassword} />
      </Route>


      <Route exact path="/accounts" >
        <MainLayout Content={AccountPage} />
      </Route>

      <Route exact path="/seeding" >
        <MainLayout Content={SeedingPage} Menu={SeedingMenuContent} />
      </Route>

      <Route exact path="/seeding/vip-viewers-livestream" >
        <MainLayout Content={VipViewersLivestream} Menu={SeedingMenuContent} />
      </Route>

      <Route exact path="/seeding/buff-viewers-livestream" >
        <MainLayout Content={BuffViewersLivestream} Menu={SeedingMenuContent} />
      </Route>

      <Route exact path="/seeding/buff-viewers" >
        <MainLayout Content={BuffViewers} Menu={SeedingMenuContent} />
      </Route>

      <Route exact path="/payments" >
        <MainLayout Content={Payments} />
      </Route>

      <Route exact path="/livestream" >
        <MainLayout Content={LivestreamPage} Menu={LivestreamMenu} />
      </Route>

      <Route exact path="/livestream/subscription" >
        <MainLayout Content={LivestreamSubscriptionPage} Menu={LivestreamMenu} />
      </Route>

      <Route exact path="/agency" >
        <MainLayout Content={AgencyPage} />
      </Route>

      {/* <Route exact path="/agency/update-price" >
        <MainLayout Content={UpdatePrice} Menu={AgencyMenu} />
      </Route> */}

      <Route exact path="/deposit" >
        <MainLayout Content={DepositPage} />
      </Route>

      <Route>
        <span>Not found</span>
      </Route>

    </Switch>
  </HashRouter>
) 
