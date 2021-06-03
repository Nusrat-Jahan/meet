import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleInputChanged = (event) => {
    const numberOfEvents = event.target.value;
    this.setState({
      numberOfEvents,
    });
    // this.props.updateEvents(numberOfEvents);

    // if (numberOfEvents >= 1 || numberOfEvents <= 32) {
    //   return this.setState({
    //     numberOfEvents,
    //   });
    // }
    // else {
    //   this.setState({
    //     numberOfEvents,
    //   });

    //   this.props.updateEvents(numberOfEvents);
    // }
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          min="1" max="32"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;