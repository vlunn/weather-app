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

        <div className="flex-container">
          <InteractiveBox title="Search city temperatures" btnTitle="Search" displayComponent={<InputBlock />} />
          <InteractiveBox title="Temperature" btnTitle="Save" displayComponent={<DisplayBlock />} />
          <InteractiveBox title="Saved cities" btnTitle="Display" displayComponent={<ListingBlock />} />
          <EmptyBlock />
        </div>

        <div className={"bgImgDiv"}>
          <img src={flowers} className={"bgImg"} alt={"Footer decorator with flowers in it."}/>
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

        <DropDownBtn btnTitle={this.props.btnTitle} />
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

class DropDownBtn extends React.Component {
  constructor(props) {
    super(props);
    this.btnTitle = props.btnTitle;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const httpObj = new XMLHttpRequest();
    const url = 'data/2.5/weather/?q=Engelskirchen&appid=1612250bcac7dd8271eb41e7a93c97de';

    httpObj.open("GET", url, true)
    httpObj.onload = function(){
      console.log(httpObj.response);
    };
    httpObj.send(null);
  }

  render() {
    return (
      <button className={"btn"} onClick={this.handleClick}>
        {this.btnTitle}
      </button>
    );
  }
}

export default App;
