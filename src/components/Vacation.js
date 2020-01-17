import React from "react";

import Form from "../components/Form"

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
    // event.preventDefault();
   
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.darksky.net/forecast/8fe3898d1200e073f650da841a460dd8/30,100';
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
      <div>
        <h1>Want to get away?</h1>

        <Form Vacation={this.Vacation} />

        <p>Temperature: {items.currently.temperature}</p>
        <p>Summary: {items.currently.summary}</p>
        {/* <p>Detailed summary: {items.minutely.summary}</p> */}
        {/* <p>Summary: {items.currently.temperature}</p> */}

        <a href="https://darksky.net/poweredby/">
          Powered By Dark Sky
          </a>

      </div>


    );
  }
}
}