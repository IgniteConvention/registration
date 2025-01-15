import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});

  const handleSchoolSubmit = (school) => setSchoolData(school);

  const handleStudentSubmit = (student) => {
    setStudents([...students, student]);
    setCurrentStudent(student); // Automatically transition to event selection
  };

  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));
    setCurrentStudent(null);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : currentStudent ? (
        <EventSelectionForm
          student={currentStudent}
          onSubmit={handleEventSubmit}
        />
      ) : (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          onNextStep={() => setCurrentStudent(students[0])} // Default to the first student
        />
      )}
    </div>
  );
}

export default App;
