import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {
  
  state = { numberOfEvents: 30 };

  handleInputChange = (event) => {
    this.props.updateEvents(undefined, event.target.value);
    const value = event.target.value;
    if (value > 30 ) {
      this.setState ({
        numberOfEvents: value,
        infoText: 'Invalid number, please choose a number between 1 and 30',
      });
    } else {
    this.setState({
      numberOfEvents: value,
      infoText: ''
    });
    }
  };

  render() {
    return (
      <div className='numberOfEvents'>
        <ErrorAlert text={this.state.infoText} />
        <label>
          Number of Events:
          <input
            type='number'
            className='event-number'
            value={this.state.numberOfEvents}
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;