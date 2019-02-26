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

        <div class="flex-container">
          <InteractiveBox title="Search city temperatures" btnTitle="Search" displayComponent={<InputBlock />} />
          <InteractiveBox title="Temperature" btnTitle="Save" displayComponent={<DisplayBlock />} />
          <InteractiveBox title="Saved cities" btnTitle="Display" displayComponent={<ListingBlock />} />
          <EmptyBlock />
        </div>

        <div className={"bgImgDiv"}>
          <img src={flowers} className={"bgImg"}/>
        </div>
      </div>
    );
  }
}

class InteractiveBox extends React.Component {
  render() {
    return (
      <div className={"container"}>
        <h2>{this.props.title}</h2>
        {this.props.displayComponent}
        <button className={"btn"}>{this.props.btnTitle}</button>
      </div>
    );
  }
}

function DisplayBlock() {
  return (
    <div>
      <p>-- Lämpötilanäyttö --</p>
    </div>
  );
}

function InputBlock() {
  return (
    <div>
      <p>-- Input-kenttä --</p>
    </div>
  );
}

function ListingBlock() {
  return (
    <div>
      <p>-- Listaus --</p>
    </div>
  );
}

function EmptyBlock() {
  return (<div className={"container"} />);
}

export default App;
