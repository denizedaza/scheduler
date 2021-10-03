import React from "react";

function getAppointmentsForDay(state, day) {
  const matchingDaysArr = state.days.filter(dayObj => {
    return dayObj.name === day
  })

  if (!state.days || matchingDaysArr.length === 0) {
    return [];
  }

  const appts = matchingDaysArr[0].appointments.map((appt) => {
    return state.appointments[appt]
  })

  return appts;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

function getInterviewersForDay(state, day) {
  const matchingDaysArr = state.days.filter(dayObj => {
    return dayObj.name === day
  })

  if (!state.days || matchingDaysArr.length === 0) {
    return [];
  }
  const appts = matchingDaysArr[0].interviewers.map((appt) => {
    return state.interviewers[appt];
  })

  return appts;
}

export { getAppointmentsForDay , getInterview, getInterviewersForDay }