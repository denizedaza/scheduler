import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }

  const interviewersList = interviewers.map(interviewersObj => {
    
    return (
      <InterviewerListItem
        key={interviewersObj.id}
        name={interviewersObj.name}
        avatar={interviewersObj.avatar}
        selected={interviewersObj.id === value}
        setInterviewer={(event) => {onChange(interviewersObj.id)}}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}

/*

Our InterviewerList takes in three props:

interviewers: array - an array of objects containing the information of each interviewer

interviewer: number - the id of an interviewer

setInterviewer: function - a function that accepts an interviewer id

*/