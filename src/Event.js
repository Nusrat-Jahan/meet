import React, { Component } from "react";

class Event extends Component {
  state = {
    isExpanded: false,
  };

  handleShowHideButton = () => {
    if (this.state.showHideDetails === true) {
      this.setState({ showHideDetails: false });
    } else {
      this.setState({ showHideDetails: true });
    }
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event" onClick={() => this.handleShowHideButton()}>
        <h1>{event.summary}</h1>
        <p>
          {new Date(event.start.dateTime).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "utc",
          })}
          ,
          {new Date(event.start.dateTime).toLocaleTimeString("en-gb", {
            time: "numeric",
          })}
        </p>{" "}
        <p className="locations">{event.location}</p>
        {this.state.showHideDetails && (
          <div className="event-details">
            <h2>About event:</h2>
            <a href={event.htmlLink}>See Details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        )}
        <button
          className="show-hide-btn"
          onClick={() => this.handleShowHideButton()}
        >
          {!this.state.showHideDetails ? "show details" : "hide-details"}
        </button>
      </div>
    );
  }
}
export default Event;