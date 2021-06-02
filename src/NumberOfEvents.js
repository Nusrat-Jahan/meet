import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleInputChanged = (event) => {
    const numberOfEvents = event.target.value;

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

      this.props.updateEvents('', numberOfEvents);
    }
  }


  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          min="1" max="32"
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents