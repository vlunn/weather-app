import React, { Component } from 'react';
import flowers from './flowers.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Weather App</h1>
        </header>

        <InteractiveContents/>

        <div className={"bgImgDiv"}>
          <img src={flowers} className={"bgImg"} alt={"Footer decorator with flowers in it."}/>
        </div>
      </div>
    );
  }
}

class InteractiveContents extends React.Component {
  /* Aggregator/parent class for interactive components in the middle of the page.
   * Stores the state. */

  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleStoreCity = this.handleStoreCity.bind(this);

    // The state of the page consists of these three parts: city name, it's temperature
    // and a list of the cities user wants to store.
    this.state = {city: '', temperature: '', storedCities: []};
  }

  // Update state when user types in the input field
  handleCityChange(newCity) {
    this.setState({city: newCity});
  }

  handleTemperatureChange(newTemperature) {
    this.setState({temperature: newTemperature});
  }

  // Make query to weather data API to get weather information
  // for the current city candidate:
  handleSubmitSearch(event) {
    const city = this.state.city;
    const url = 'data/2.5/weather/?q=' + city + '&appid=1612250bcac7dd8271eb41e7a93c97de';
    const httpObj = new XMLHttpRequest();
    let fetchedTemperature;

    httpObj.open("GET", url, false);

    httpObj.onload = function(){
      if (httpObj.status === 200) {
        const parsed = JSON.parse(httpObj.response);
        fetchedTemperature = parsed.main.temp;
      }
      else {
        console.log("Something went wrong. Did you remember to type in a city name before search?");
        fetchedTemperature = '';
      }
    };

    httpObj.send(null);

    this.setState({temperature: fetchedTemperature});
    event.preventDefault();  // Prevent page reload
  }

  handleStoreCity(event) {
    let cityToAdd = this.state.city;
    let storedCities = this.state.storedCities;

    if (cityToAdd !== '' && storedCities.indexOf(cityToAdd) < 0) {
      this.setState({storedCities: (this.state.storedCities.concat([cityToAdd]))});
    }
  }

  render() {
    const parentCity = this.state.city;
    return (
      <div className="flex-container">
        <SearchCityBox
          title="Search city temperatures"
          btnTitle="Search"
          changeFunction={this.handleCityChange}
          submitFunction={this.handleSubmitSearch}
          city={parentCity} />

        <DisplayBox
          title="Temperature"
          btnTitle="Save"
          changeFunction={this.handleTemperatureChange}
          submitFunction={this.handleStoreCity}
          temperature={this.state.temperature}
          city={this.state.city} />

        <ListingBox
          title="Stored cities"
          storedCities={this.state.storedCities}
          btnTitle="Display" />

          <div className={"container"} /* Empty block for visual balance */ />
      </div>
    );
  }
}

class SearchCityBox extends React.Component {
  /** Container class for an input field and query button for querying weather data for a given city. */

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  handleChange(event) {
    this.props.changeFunction(event.target.value);
  }

  handleSubmitSearch(event) {
    this.props.submitFunction(event);
  }

  render() {
    return (
      <div className={'container'}>
        <h2>{this.props.title}</h2>
        Type in a city:
        <fieldset className={'inputGroup'}>
          <input type="text" value={this.props.city} onChange={this.handleChange} /><br/>
          <input type="submit" value={this.props.btnTitle} className={'btn'} onClick={this.handleSubmitSearch}/>
        </fieldset>
      </div>
    );
  }
}

class DisplayBox extends React.Component {
  /** Container class for displaying queried weather data for a city. */

  constructor(props) {
    super(props);
    this.handleStoreCity = this.handleStoreCity.bind(this);
  }

  handleStoreCity(event) {
    this.props.submitFunction(event);
  }

  render() {
    let output = (this.props.temperature !== '') ?
      <p>City: {this.props.city}<br/>Temperature: {this.props.temperature} F</p> :
      <p>Search for a new city!</p>;

    return (
      <div className={'container'}>
        <h2>{this.props.title}</h2>
        {output}
        <input type="submit" value={this.props.btnTitle} className={'btn'} onClick={this.handleStoreCity}/>
      </div>
    );
  }
}

class ListingBox extends React.Component {
  /** Container class for listing all the towns the user has saved in the UI. */

  render() {
    const cities = this.props.storedCities;

    let output = (cities.length > 0) ?
      <p>{cities.join(" ")}</p> :
      <p>No stored cities yet.</p>;

    return (
      <div className={"container"}>
        <h2>{this.props.title}</h2>
        {output}
      </div>
    );
  }
}

export default App;
