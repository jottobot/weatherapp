import React from "react";

const titleStyle = {
  color: 'black',
  textAlign: 'center',
  paddingTop: "50px"
};

const loadStyle = {
  textAlign: "center",
  padding: "50px"
};

const tempStyle = {
  textAlign: "center",
  fontSize: "60px",
  padding: "30px"
}

const summaryStyle = {
  textAlign: "center",
  fontSize: "25px"
}

const detailStyle = {
  textAlign: "center",
  fontSize: "40px",
  paddingBottom: "50px"
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
      return <div style={loadStyle}>Grabbing your location...</div>;
    } else {
      return (
        <div>
          <h1 style={titleStyle}>Your current weather forecast.</h1>

          <p style={tempStyle}>{items.currently.temperature}° F</p>
          <p style={summaryStyle}> {items.daily.summary}</p>
          <p style={detailStyle}>It is looking like it is going to be: <br /> {items.minutely.summary}</p>

        </div>

      );
    }
  }
}

