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
    // Add more categories and events as needed
  };

  const handleSchoolSubmit = (school) => setSchoolData(school);

  const handleStudentSubmit = (student) => setStudents([...students, student]);

  const handleNextStep = () => {
    setCurrentStudentIndex(0); // Start event selection for the first student
  };

  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));
    if (currentStudentIndex + 1 < students.length) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    } else {
      setCurrentStudentIndex(null); // Complete event selection
    }
  };

  const handleFinalize = () => {
    alert("Registration finalized!"); // Replace with actual logic
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : currentStudentIndex === null ? (
        <>
          <StudentRegistrationForm
            onSubmit={handleStudentSubmit}
            onNextStep={handleNextStep}
          />
          {Object.keys(selectedEvents).length === students.length && (
            <button className="finalize-button" onClick={handleFinalize}>
              Finalize Registration
            </button>
          )}
        </>
      ) : (
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={selectedEvents[students[currentStudentIndex].studentName] || []}
          onSubmit={handleEventSubmit}
        />
      )}
    </div>
  );
}

export default App;
