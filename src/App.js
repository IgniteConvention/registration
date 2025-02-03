// App.js
import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import availableEvents from "./events"; // Importing the events list from the external file
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [showEventSelection, setShowEventSelection] = useState(false);
  const [showFinalReview, setShowFinalReview] = useState(false);

  // Handle school submission
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  // Handle student submission
  const handleStudentSubmit = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  // Handle student editing
  const handleStudentEdit = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  // Handle event submission for a student
  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));
    setCurrentStudentIndex(null);
  };

  // Set the current student index for event registration
  const handleAddEvents = (index) => {
    setCurrentStudentIndex(index);
  };

  // Navigate to event selection page
  const handleRegisterForEvents = () => {
    setShowEventSelection(true);
  };

  // Show final review page
  const handleFinalize = () => {
    setShowFinalReview(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>

      {/* School Registration Form */}
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !showEventSelection ? (
        // Student Registration Form
        <>
          <StudentRegistrationForm
            onSubmit={handleStudentSubmit}
            students={students}
            onEdit={handleStudentEdit}
          />
          <h3>Students Registered:</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.studentName} - {student.studentAge} years old ({student.studentGender})
                <button onClick={() => handleStudentEdit(index, student)}>Edit</button>
              </li>
            ))}
          </ul>
          {students.length > 0 && <button onClick={handleRegisterForEvents}>Register for Events</button>}
        </>
      ) : currentStudentIndex !== null ? (
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={selectedEvents[students[currentStudentIndex]?.studentName] || []}
          onSubmit={handleEventSubmit}
          onBack={() => setCurrentStudentIndex(null)}
        />
      ) : showFinalReview ? (
        <div className="container finalize-registration">
          <h2>Final Review</h2>
          <ul>
            {students.map((student) => (
              <li key={student.studentName}>
                <strong>{student.studentName}</strong>: {selectedEvents[student.studentName]?.map(e => e.eventName).join(", ") || "No events selected"}
              </li>
            ))}
          </ul>
          <button onClick={() => alert("Registration Complete!")}>Finalize Registration</button>
        </div>
      ) : (
        <StudentVerificationPage
          students={students}
          selectedEvents={selectedEvents}
          onAddEvents={handleAddEvents}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  );
}

export default App;
