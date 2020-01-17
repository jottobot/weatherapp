import React from "react";

const Form = props => (
  <div>
    <h1>Want to get away?</h1>
    <form onSubmit={props.Vacation}>
      <input type="text" name="lat" placeholder="Latitude of city" />
      <input type="text" name="long" placeholder="Longitude of city" />
      <button>Get Weather</button>
    </form>
  </div>
);

export default Form;

// class Form extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       lat: null,
//       long: null
//     }
//   }

//   handleChange = (event) => {
//     console.log(event.target.name);
//     console.log(event.target.value);
//     this.setState({
//       [event.target.lat]: event.target.value,
//       [event.target.long]: event.target.value
//     })
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div>
//         <h1>Want to get away?</h1>
//         <form onSubmit={this.props.Vacation}>
//           <input type="text" name="lat" placeholder="Latitude of city" onChange={this.handleChange} />
//           <input type="text" name="long" placeholder="Longitude of city" onChange={this.handleChange} />
//           <button>Get Weather</button>
//         </form>
//       </div>
//     );
//   }
// }