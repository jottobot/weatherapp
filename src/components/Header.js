import React from "react";

import Background from "../images/photo-1516490981167-dc990a242afe.jpeg";

const headerStyle = {
  color: 'white',
  paddingTop: "100px",
  backgroundImage: "url(" + Background + ")",
  height: "400px",
  textAlign: 'center',
  fontSize: "70px",
  textTransform: "uppercase",
};

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 style={headerStyle}>Weather Now</h1>
      </div>    
    )
  }
}

export default Header;