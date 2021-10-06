import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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

  const getNewDays = (id, appointments) => {
    // Update the value of the key spots, inside a specific day inside the days array of the state object.
    // ::: state = {}, days = [] --> day entries intside days[] is an {}

    // .find() to find the day object inside days []
    const foundDay = state.days.find(day => {
      return day.appointments.indexOf(id) > -1
    }); //obj 
    
    // .findIndex() to find the day index inside days []
    const dayIndex = state.days.findIndex(element => element.name === foundDay.name); //num

    // console.log("state:", state);

    // Spots are the amount of interviews with null as a value
    // .filter() to find all the nulls
    const dayAppointments = foundDay.appointments.map((dayIndex) => {
      return appointments[dayIndex];
    })
    // console.log("day appointments:", dayAppointments)

    const nullSlots = dayAppointments.filter((appointment) => {
      return appointment.interview === null;
    })

    // .length to count
    const slotRemaining = nullSlots.length;

    // Appointments for a day are: ids of relevant appointments are inside the day object inside the days array
    // We use length to check how many

    const newDays = [...state.days]
    newDays[dayIndex].spots = slotRemaining
    // console.log("new days:", newDays);

    return newDays;

    // To update safely
    // Spread the day object
    // Spread the days array
    // Put the updated day object inside the array (index)
  };

  function bookInterview(id, interview) {
    // console.log("BookInterview:", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const newDays = getNewDays(id, appointments);
        setState({ ...state, appointments, days: newDays })
      })

  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const newDays = getNewDays(id, appointments);
        setState({ ...state, appointments, days: newDays })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}