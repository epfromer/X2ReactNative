import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import EmailDetailView from '../views/EmailDetailView'
import EventTimelineView from '../views/EventTimelineView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchHistoryView from '../views/SearchHistoryView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import WordCloudView from '../views/WordCloudView'

// const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth === true ? <Component {...props} /> : <Redirect to="/SignInView" />
//     }
//   />
// )

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/AppSettingsView">
        <AppSettingsView />
      </Route>
      <Route path="/SearchHistoryView">
        <SearchHistoryView />
      </Route>
      <Route path="/SearchView">
        <SearchView data-testid="switch" />
      </Route>
      <Route path="/ChordView">
        <ChordView />
      </Route>
      <Route path="/WordCloudView">
        <WordCloudView />
      </Route>
      <Route path="/EventTimelineView">
        <EventTimelineView />
      </Route>
      <Route path="/PieView">
        <PieView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/NetworkGraphView">
        <NetworkGraphView />
      </Route>
      <Route path="/PolarView">
        <PolarView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/VolumeTimelineView">
        <VolumeTimelineView />
      </Route>
      <Route path="/EmailDetailView/:id">
        <EmailDetailView />
      </Route>
      <Route exact path="/">
        <HomeView />
      </Route>
    </Switch>
  )
}
