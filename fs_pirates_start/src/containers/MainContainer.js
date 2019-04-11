import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import PirateList from '../components/pirates/PirateList';
import Request from '../helpers/request';
import PirateDetails from "../components/pirates/PirateDetails";
import PirateForm from "../components/pirates/PirateForm";

class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      pirates: [],
      ships: [],
      raids: []
    };
    this.findPirateById = this.findPirateById.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const request = new Request()

    const piratePromise = request.get("/api/pirates");
    const shipPromise = request.get("/api/ships");
    const raidPromise = request.get("/api/raids");

    const promises = [piratePromise, shipPromise, raidPromise];

    Promise.all(promises)
    .then(data => {
      this.setState({
        pirates: data[0]._embedded.pirates,
        ships: data[1]._embedded.ships,
        raids: data[2]._embedded.raids
      })
    })
  }

  findPirateById(id){
    const pirate = this.state.pirates.find((pirate) => {
      return pirate.id === parseInt(id);
    })
    return pirate;
  }

  handleDelete(id){
    const request = new Request();
    const url = `/api/pirates/${id}`;
    request.delete(url).then(() => {
      window.location = "/pirates";
    })
  }

  render(){
    return (
      <div>
      <Router>
      <React.Fragment>
      <NavBar/>
      <Switch>
      {/* GET ALL PIRATES */}
      <Route exact path="/pirates" render={(props) => {
        return <PirateList pirates = {this.state.pirates}/>
      }}/>

      <Route path="/pirates/new" render = {(props) => {
        return <PirateForm ships={this.state.ships}/>
      }}/>

      <Route exact path="/pirates/:id" render = {(props) => {
        const id = props.match.params.id;
        const pirate = this.findPirateById(id);
        return <PirateDetails pirate={pirate} onDelete={this.handleDelete}/>
      }}/>

      </Switch>


      </React.Fragment>
      </Router>
      </div>
    )
  }
}

export default MainContainer;
