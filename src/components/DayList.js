import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const daysArray = props.days.map(dayObj => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === props.day}
        setDay={props.setDay}
      />
    )
  })

  return <ul>{daysArray}</ul>
};

/*

Our DayList component will take in three props.

days:  Array a list of day objects (each object includes an id, name, and spots)
day:  String the currently selected day
setDay:  Function accepts the name of the day eg. "Monday", "Tuesday"

*/