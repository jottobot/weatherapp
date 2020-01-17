import React from "react";

export default class getWeather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    // geolocater
    if ("geolocation" in navigator) {
      console.log("geolocation avail");
      navigator.geolocation.getCurrentPosition(async position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        // fetch without cors issue
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
          targetUrl = `https://api.darksky.net/forecast/8fe3898d1200e073f650da841a460dd8/${lat},${lon}`;
        fetch(proxyUrl + targetUrl)
          .then(blob => blob.json())
          .then(data => {
            console.log(data);
            this.setState({
              isLoaded: true,
              items: data,
            })
            document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
            return data;
          })
          .catch(e => {
            console.log(e);
            return e;
          });
      })
    } else {
      console.log("No geolocation found");
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Your current weather forecast.</h1>

          <p>Temperature: {items.currently.temperature}</p>
          <p>Summary: {items.currently.summary}</p>
          <p>Detailed summary: {items.minutely.summary}</p>
          {/* <p>Summary: {items.currently.temperature}</p> */}

          <a href="https://darksky.net/poweredby/">
            Powered By Dark Sky
          </a>

        </div>


      );
    }
  }
}

