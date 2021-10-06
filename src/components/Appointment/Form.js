import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { name, interviewers, value, onSave, onCancel } = props;

  const [currentName, setName] = useState(name || "");
  const [currentInterviewer, setInterviewer] = useState(value || null);

  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() {
    if (currentName === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    onSave(currentName, currentInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          /*
            This must be a controlled component
          */
            value={currentName}
            onChange={(event) => setName(event.target.value)}
          />
        <section className="appointment__validation">{error}</section>  
        </form>
        <InterviewerList interviewers={interviewers} value={currentInterviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={(event) => event.preventDefault()} onClick={ () => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}

/*

As part of our Edit story, the Form component should take the following props:

name:  String
interviewers:  Array
interviewer:  Number
onSave:  Function
onCancel:  Function

As part of our Create story, the Form component should take the following props:

interviewers:  Array
onSave:  Function
onCancel:  Function

*/