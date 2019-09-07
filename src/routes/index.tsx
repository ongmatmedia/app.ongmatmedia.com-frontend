import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MainLayout } from '../containers/main';
import {SeedingPage, SeedingMenuContent} from './seeding'
import { LivestreamPage } from './livestream';


export const AppWithRouter = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <MainLayout Content={() => <span>Main</span>} />
      </Route>

      <Route exact path="/seeding" >
        <MainLayout Content={SeedingPage} Menu={SeedingMenuContent}/>
      </Route>

      

      <Route exact path="/livestream" >
        <MainLayout Content={LivestreamPage}  />
      </Route>



      <Route>
        <span>Not found</span>
      </Route>

    </Switch>
  </HashRouter>
)