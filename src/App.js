import React, { Component } from 'react';
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import PropTypes from 'prop-types';
import { WarningAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all'
  }

  updateEvents = (updatedLocation, eventCount) => {
    const { selectedLocation, numberOfEvents } = this.state;
    // console.log("numberofevents", numberOfEvents);
    if (updatedLocation) {
      // console.log("updatedLocation", updatedLocation);
      getEvents().then((events) => {
        const locationEvents = (updatedLocation === 'all') ?
          events : events.filter((event) => event.location === updatedLocation);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        // console.log("1stnumberofevents", numberOfEvents);
        // console.log("1st", locationEvents);
        this.setState({
          events: filteredEvents,
          selectedLocation: updatedLocation
        });
      });
    } else {
      // console.log("eventcount", eventCount);
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
          events : events.filter((event) => event.location === selectedLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        // console.log("locationevents", locationEvents);
        // console.log("filteredEvents", filteredEvents);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount
        });
      });
    }
  }
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  // componentDidMount to make the API call and save the initial data to state:
  componentDidMount() {
    this.mounted = true;

    const { numberOfEvents } = this.state;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events),
        });
        console.log("events", events);
      }
    });

    if (!navigator.onLine) {
      return this.setState({
        warningText: "You are currently offline, events may not be up-to-date.",
      });
    } else {
      this.setState({
        warningText: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { events } = this.state;
    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <h1 className='header-title'>Meet App</h1>
        <h4 className='filter-title'>Choose your nearest city</h4>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} eventCount={this.state.eventCount} />
        {/*  pass the locations and updateEvents method as a prop to CitySearch */}

        <div className="number-input">
          <p className="input-label number-label">Show number of events:</p>
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} eventCount={this.state.eventCount} />
        </div>

        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis
                type="category"
                dataKey="city"
                name="city" />
              <YAxis
                type="number"
                dataKey="number"
                name="number of events"
                allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        {/* pass the state to EventList, as a prop of events */}
        {/* <Event showDetails={this.state.showDetails} /> */}
        {/* <WarningAlert text={this.state.warningText} /> */}
      </div >
    );
  }
}
NumberOfEvents.propTypes = {
  numberOfEvents: PropTypes.number,
  updateEvents: PropTypes.func,
}
export default App;

