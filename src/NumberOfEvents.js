import React, { Component } from 'react';

export class NumberOfEvents extends Component {
  
  state = { numberOfEvents: 30 };

  handleInputChange = (event) => {
    this.props.updateEvents(undefined, event.target.value);
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
  };

  render() {
    return (
      <div className='numberOfEvents'>
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