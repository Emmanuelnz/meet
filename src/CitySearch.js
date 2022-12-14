import React, { Component } from 'react';
import { InfoAlert } from './Alert';

export class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({showSuggestions:true});
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        showSuggestions: false,
        infoText: 'We could not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText:''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: '',
    });
  
    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className='CitySearch'>
        <InfoAlert className="InfoAlert" text={this.state.infoText} />
        <h3>Search Cities</h3>
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          placeholder="Enter City"
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }} >
          {this.state.suggestions.map((suggestion) => (
            <li 
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
              >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")} >
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;