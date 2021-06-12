import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleInputChanged = (event) => {
    const numberOfEvents = parseInt(event.target.value);
    if (numberOfEvents < 1 || numberOfEvents > 32) {
      return this.setState({
        numberOfEvents: '',
        errorText: `Please select number between 1 and 32`,
      });
    } else {
      this.setState({
        numberOfEvents,
        errorText: '',
      });
      // this.setState({
      //   numberOfEvents,
      // });
      this.props.updateEvents(null, numberOfEvents);
    }
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.errorText} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} />
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