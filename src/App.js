import React, { Component } from 'react';
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
// import Event from './Event';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: [],
    // showDetails: []
  }
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} />
        <EventList events={this.state.events} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} />
        {/* <Event showDetails={this.state.showDetails} /> */}
      </div>
    );
  }
}

export default App;