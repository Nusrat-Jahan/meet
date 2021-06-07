import React, { Component } from 'react';
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    eventsByLocation: null,
    currentLocation: 'all'
    // selectedLocation: 'all'
  }

  // updateEvents = (location) => {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //       events :
  //       events.filter((event) => event.location === location);
  //     const { numberOfEvents } = this.state;
  //     const filteredEvents = locationEvents.slice(0, numberOfEvents);
  //     // const eventsByLocation = locationEvents.length;
  //     this.setState({
  //       events: filteredEvents,
  //       // eventsByLocation: eventsByLocation,
  //       currentLocation: location
  //     });
  //   });
  // }
  // updateEventCount = eventCount => {
  //   const { currentLocation } = this.state;
  //   this.setState({
  //     numberOfEvents: eventCount
  //   });
  //   this.updateEvents(currentLocation);
  // }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        return this.setState({
          events: filteredEvents,
          currentLocation: location,
          locations: events.locations,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          (currentLocation === 'all')
            ? events
            : events.filter(
              (event) => event.location === currentLocation
            );
        const filteredEvents = locationEvents.slice(0, eventCount);
        return this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
          locations: events.locations,
        });
      });
    }
  };
  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events),
          // eventsByLocation: events.length

        });
      }
      // this.updateEvents();
    });
    // this.updateEvents();
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
        <div className="number-input">
          <p className="input-label number-label">Show number of events:</p>
          {/* <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventCount={this.updateEventCount} /> */}
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        </div>
        <EventList events={this.state.events} />
        {/* pass the state to EventList, as a prop of events */}
        {/* <Event showDetails={this.state.showDetails} /> */}
      </div>
    );
  }
}

export default App;

