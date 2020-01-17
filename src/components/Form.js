import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      // onSubmit to call props.Vacation on submit of form
      <form onSubmit={this.props.Vacation}>
        <input type="text" value="lat" placeholder="Latitude of city" />
        <input type="text" value="lon" placeholder="Longitude of city" />
        <button>Submit</button>
      </form>
    );
  }
}

export default Form;