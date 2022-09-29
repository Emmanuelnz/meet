import React, { Component } from 'react';

export class NumberOfEvents extends Component {
  
  state = { numberOfEvents: 32 };

  handleInputChange = (event) => {
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