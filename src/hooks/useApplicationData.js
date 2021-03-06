import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const getNewDays = (id, appointments) => {
    const foundDay = state.days.find((day) => {
      return day.appointments.indexOf(id) > -1;
    });

    const dayIndex = state.days.findIndex(
      (element) => element.name === foundDay.name
    ); //num

    const dayAppointments = foundDay.appointments.map((dayIndex) => {
      return appointments[dayIndex];
    });

    const nullSlots = dayAppointments.filter((appointment) => {
      return appointment.interview === null;
    });

    const slotRemaining = nullSlots.length;

    const newDays = [...state.days];
    newDays[dayIndex].spots = slotRemaining;

    return newDays;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const newDays = getNewDays(id, appointments);
      setState({ ...state, appointments, days: newDays });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newDays = getNewDays(id, appointments);
      setState({ ...state, appointments, days: newDays });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
