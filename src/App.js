import React from "react";

import Header from "./components/Header";

import Vacation from "./components/Vacation";

import GetWeather from "./components/GetWeather";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div>

      <Header />

      <GetWeather />

      <Vacation />

      </div>
    );
  }
  
} 

export default App;