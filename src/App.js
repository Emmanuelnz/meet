import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import { OfflineAlert } from './Alert';

import './App.css';
import './nprogress.css';


class App extends Component {
  state = {
    showWelcomeScreen: undefined,
    events: [],
    locations: [],
    numberOfEvents: 30,
    seletedLocation: 'all',
    offlineText: '',
    
  }
  
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

  if (!navigator.onLine) {
    this.setState({
      offlineText: 'No internet connection detected! Data my not be up to date.'
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }
    
  
  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (location === undefined) {
      location = this.state.seletedLocation;
    }
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    }
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
        seletedLocation: location
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className="App">
        <h1>Meet App</h1>
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
