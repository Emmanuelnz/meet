import React, { Component } from 'react';

class Event extends Component {
  onToggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  state = { show: false };

  render() {
    const { event } = this.props;
    return (
      <>
        <div className="event">
          <h1 className="event-summary-title">{event.summary}</h1>
          <p className="event-info">
            {event.start.dateTime} 
            {event.start.timeZone} 
            {event.location}
          </p>
          {this.state.show && (
            <>
              <h2 className="event-about-title">About event:</h2>
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noreferrer"
                className="event-htmlLink"
              > See details on Google Calendar
              </a>
              <p className="event-description">{event.description}</p>
            </>
          )}
          {!this.state.show ? (
            <button
              className="event-showDtls-btn"
              onClick={this.onToggleEventDetails}
            > Show Details
            </button>
          ) : (
            <button
              className="event-hideDtls-btn"
              onClick={this.onToggleEventDetails}
            > Hide Details
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Event;