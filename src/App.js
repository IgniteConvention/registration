import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});

  const availableEvents = {
    "Category A": ["Event 1", "Event 2", "Event 3"],
    "Category B": ["Event 4", "Event 5", "Event 6"],
    "Category C": ["Event 7", "Event 8", "Event 9"],
  };

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  const handleStudentSubmit = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const handleNextStep = () => {
    if (students.length > 0) {
      setCurrentStudentIndex(0); // Start event selection for the first student
    } else {
      alert("Please register at least one student before proceeding.");
    }
  };

  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));

    if (currentStudentIndex + 1 < students.length) {
      setCurrentStudentIndex((prevIndex) => prevIndex + 1); // Move to the next student
    } else {
      setCurrentStudentIndex(null); // End event selection
    }
  };

  const handleFinalize = () => {
    alert("Registration finalized!");
    console.log("Finalized Data:", { students, selectedEvents });
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : currentStudentIndex === null ? (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          onNextStep={handleNextStep}
        />
      ) : (
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={
            selectedEvents[students[currentStudentIndex]?.studentName] || []
          }
          onSubmit={handleEventSubmit}
        />
      )}
    </div>
  );
}

export default App;
