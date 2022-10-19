import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './App.css';
import './nprogress.css';


class App extends Component {
  state = {
    showWelcomeScreen: undefined,
    events: [],
    locations: [],
    numberOfEvents: 30,
    seletedLocation: 'All',
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
      offlineText: 'No internet connection detected! Data may not be up to date.'
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className='App'>
        <h1 className='title'>M E E T</h1>
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents updateEvents={this.updateEvents}numberOfEvents={numberOfEvents} />
        <div className='data-vis-wrapper'>
        <EventGenre events={events} />
        <ResponsiveContainer height={400} >
        <ScatterChart
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="City" />
          <YAxis 
            type="number" 
            dataKey="number" 
            name="Number of events" 
            allowDecimals={false} 
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#305cd9" />
        </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList events={events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
