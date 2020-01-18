import React from "react";

import Pic from "../images/photo-1547659919-2da4556aa183.jpeg";

const divStyle = {
  backgroundColor: "black",
  color: "white",
  padding: "30px"
}

const vacayStyle = {
  fontSize: "30px",
  paddingTop: "30px"
}

const tempStyle = {
  textAlign: "center",
  fontSize: "30px",
  paddingTop: "160px"
}

const summaryStyle = {
  textAlign: "center",
  fontSize: "25px"
}

const titleStyle = {
  paddingTop: "60px",
  textTransform: "uppercase"
};

const picStyle = {
  height: "280px",
  width: "auto",
  textAlign: "center",
  alignContent: "center",
  paddingTop: "30px",
  marginBottom: "100px"
}

export default class Vacation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    // fetch without cors issue
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://api.darksky.net/forecast/8fe3898d1200e073f650da841a460dd8/21,72`;
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
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div></div>;
    } else {
      return (
        <div style={divStyle}>
          <div className="row">
            <div className="col-md-6">
              <h1 col-6 style={titleStyle}>Want to get away?</h1>
              <h4 col-6 style={vacayStyle}>
                Come visit the Carribean...
              </h4>
              <img src={Pic} alt="" style={picStyle} />

            </div>

            <div className="col-md-6">
              <p style={tempStyle}>{items.currently.temperature}° F</p>
              <p style={summaryStyle}>Summary: {items.currently.summary}</p>
            </div>

          </div>

          <a href="https://darksky.net/poweredby/">
            Powered By Dark Sky
          </a>

        </div>


      );
    }
  }
}