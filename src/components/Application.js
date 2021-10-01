import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";

// "GET_DAYS":         http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Peter Parker",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  // {
  //   id: 4,
  //   time: "4pm",
  //   interview: {
  //     student: "Veronica Mars",
  //     interviewer: {
  //       id: 1,
  //       name: "Tori Malcom",
  //       avatar: "https://i.imgur.com/Nmx0Qxo.png",
  //     }
  //   }
  // },
  {
    id: 5,
    time: "2:30pm",
    interview: {
      student: "Patrick Star",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

const scheduledAppointemnts = appointments.map(apptsObj => {
  return (
    <Appointment
      key={apptsObj.id}
      {...apptsObj}
    />
  )
})

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
    setState(prev => ({ ...prev, days }))
  }

  useEffect(() => {
    axios.get("/api/days")
    .then(response => 
      setDays(response.data));
  }, []);

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
