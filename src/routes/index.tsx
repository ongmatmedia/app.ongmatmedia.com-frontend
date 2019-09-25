import React, { useState } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MainLayout } from '../containers/main';
import { SeedingPage, SeedingMenuContent } from './seeding'
import { LivestreamPage } from './livestream';
import { AuthLayout } from '../containers/auth';
import { Login, ResetPassword } from './auth';
import { AccountPage } from './account'
import { SetNewPasswordPage } from './auth/set-new-pass';


export const AppWithRouter = () => (
  <HashRouter>
    <Switch>


      <Route exact path="/">
        <MainLayout Content={() => <span>Main</span>} />
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



      <Route exact path="/livestream" >
        <MainLayout Content={LivestreamPage} />
      </Route>



      <Route>
        <span>Not found</span>
      </Route>

    </Switch>
  </HashRouter>
) 