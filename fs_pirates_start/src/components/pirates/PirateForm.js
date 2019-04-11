import React from "react";
import Request from "../../helpers/request";

class PirateForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: 0,
      ship: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    const request = new Request();
    request.post("/api/pirates", this.state).then(() => {
      window.location = "/pirates"
    })
  }

  render(){

    const ships = this.props.ships.map((ship, index) => {
      return <option key={index} value={ship._links.self.href}>{ship.name}</option>
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="First name" name="firstName" onChange={this.handleChange}/>
        <input type="text" placeholder="Last name" name="lastName" onChange={this.handleChange}/>
        <input type="number" placeholder="Age" name="age" onChange={this.handleChange}/>
        <select name="ship" defaultValue="default" onChange={this.handleChange}>
          <option disabled value="default">Choose a ship</option>
          {ships}
        </select>
        <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default PirateForm;
