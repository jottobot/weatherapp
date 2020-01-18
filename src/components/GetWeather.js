import React from "react";

import { MDBIcon } from "mdbreact";

const loadStyle = {
  textAlign: "center",
  padding: "50px",
  fontSize: "30px"
};

const titleStyle = {
  color: 'black',
  textAlign: 'center',
  paddingTop: "50px",
  fontWeight: "bold"
};

const tempStyle = {
  textAlign: "center",
  fontSize: "30px",
  marginTop: "50px",
  marginBottom: "50px"
}

const summaryStyle = {
  textAlign: "center",
  fontSize: "25px"
}

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
            });
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
      return <div style={loadStyle}>Grabbing your location
      <MDBIcon icon="spinner" pulse size="1x" fixed />
        {/* <span className="sr-only">Loading...</span> */}
      </div>;
    } else {
      return (
        <div>
          <h2 style={titleStyle}>Based on your current location...</h2>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <p style={tempStyle}>Temperature is {items.currently.temperature}° F and {items.currently.summary}</p>
              {/* <img src='{items.currently.icons}' alt=""/> */}
              {/* <FaCloudRain />*/}
              {/* <MDBIcon icon="cloud-rain" /> */}
             {/* <MDBIcon icon={items.currently.icons} /> */}
              <p style={tempStyle}>Feels like: {items.currently.apparentTemperature}° F <br />High: {items.daily.data[0].temperatureHigh}° F <br /> Low: {items.daily.data[0].temperatureLow} ° F</p>
            </div>
            <div className="col">
              <p style={tempStyle}>Looks like it is going to be: <br /> {items.minutely.summary}</p>
              <p style={summaryStyle}>{items.daily.summary}</p>
            </div>
          </div>
        </div>

      );
    }
  }
}

