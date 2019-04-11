import React from 'react';
import {Link} from "react-router-dom";

const Pirate = (props) => {

  if(!props.pirate){
    return "Loading..."
  }

  const url = `/pirates/${props.pirate.id}`

  return (
    <>
    <Link to = {url} className = "name">
    {props.pirate.firstName} {props.pirate.lastName}</Link>
    <p>Age: {props.pirate.age}</p>
    <p>Ship: {props.pirate.ship.name}</p>
    </>
  )
}

export default Pirate;
