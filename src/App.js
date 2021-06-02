import React, { Component } from 'react';
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { WarningAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
  };
  render() {
    return (
      <div className="App">
        <CitySearch />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

