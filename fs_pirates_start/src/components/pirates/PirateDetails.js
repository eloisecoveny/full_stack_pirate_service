import React from "react";
import Pirate from "./Pirate";

const PirateDetails = (props) => {

  if(!props.pirate){
    return "Loading..."
  }

  const handleDelete = () => {
    props.onDelete(props.pirate.id);
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })

  return (
    <div className="component">
      <Pirate pirate={props.pirate} />
      <ul>
        {raids}
      </ul>
      <button onClick={handleDelete}>Delete {props.pirate.firstName}</button>
    </div>
  )
}

export default PirateDetails;
