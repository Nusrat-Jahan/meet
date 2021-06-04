import React, { Component } from 'react';
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
// import Event from './Event';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: [],
    // showDetails: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1 className='header-title'>Meet App</h1>
        <h4 className='filter-title'>Choose your nearest city</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        {/*  pass the locations and updateEvents method as a prop to CitySearch */}
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        {/* pass the state to EventList, as a prop of events */}
        {/* <Event showDetails={this.state.showDetails} /> */}
      </div>
    );
  }
}

export default App;