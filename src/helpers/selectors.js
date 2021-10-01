import React from "react";

export function getAppointmentsForDay(state, day) {
  const dayApptsArray = state.days;
  const matchingDaysArr = dayApptsArray.filter(dayObj => {
    return dayObj.name === day
  })

  if (!dayApptsArray || matchingDaysArr.length === 0) {
    return [];
  }

  const appts = matchingDaysArr[0].appointments.map((appt) => {
    return state.appointments[appt]
  })

  return appts;
}