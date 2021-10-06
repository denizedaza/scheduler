import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

const formatSpots = (spots) => {
  if (spots === 1) {
    return `${spots} spot remaining`;
  }

  return spots ? `${spots} spots remaining` : `no spots remaining`;
};

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const spotsAvailableMsg = formatSpots(spots);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li className={dayClass} data-testid={"day"} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsAvailableMsg}</h3>
    </li>
  );
}
