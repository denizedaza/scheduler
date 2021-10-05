import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

// "GET_DAYS":         http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const scheduledAppointemnts = dailyAppointments.map(apptsObj => {
    const interview = getInterview(state, apptsObj.interview);

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState( {
    //   ...state,
    //   appointments: appointments
    // })
    return axios.put(`/api/appointments/${id}`, {...appointment})
      .then(() => setState(...state, appointments))
  }

  function cancelInterview(id) {

    const appointments = { ...state.appointments };
    appointments[id].interview = null; 

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState(appointments));
  }

    return (
      <Appointment
        key={apptsObj.id}
        id={apptsObj.id}
        time={apptsObj.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(all => {
      setState(prev => ({
        ...prev, days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  console.log(state.interviewers);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduledAppointemnts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
