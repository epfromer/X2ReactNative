import React from 'react'
import { Route, Switch } from 'react-router'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import DashboardView from '../views/DashboardView'
import EventTimelineView from '../views/EventTimelineView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import WordCloudView from '../views/WordCloudView'

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/ChordView">
        <ChordView />
      </Route>
      <Route path="/WordCloudView">
        <WordCloudView />
      </Route>
      <Route path="/VolumeTimelineView">
        <VolumeTimelineView />
      </Route>
      <Route path="/NetworkGraphView">
        <NetworkGraphView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/EventTimelineView">
        <EventTimelineView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/PolarView">
        <PolarView />
      </Route>
      <Route path="/PieView">
        <PieView />
      </Route>
      <Route path="/SearchView">
        <SearchView />
      </Route>
      <Route path="/">
        <DashboardView />
      </Route>
    </Switch>
  )
}