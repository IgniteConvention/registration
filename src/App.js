import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import { availableEvents } from "./events";  // Ensure this is correctly imported from events.js
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);  // Store students here
  const [selectedEvents, setSelectedEvents] = useState({});  // Store events for each student
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);  // Track the current student for event registration
  const [showFinalReview, setShowFinalReview] = useState(false);

  // Handle school submission
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  // Handle student registration (allow multiple entries)
  const handleStudentSubmit = (student) => {
    setStudents((prev) => [...prev, student]);  // Add new student to the list
  };

  // Handle student editing (update the student at a specific index)
  const handleStudentEdit = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  // Handle event selection for a student
  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));  // Store selected events for the student
    setCurrentStudentIndex(null);  // Reset current student index after submission
  };

  // Handle the flow of event selection for each student
  const handleAddEvents = (index) => {
    setCurrentStudentIndex(index);  // Set the student index for event selection
  };

  // Finalize the registration and show the final review page
  const handleFinalize = () => {
    setShowFinalReview(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>

      {/* School Registration Form */}
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : students.length === 0 ? (
        // Student Registration Form
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          students={students}
        />
      ) : currentStudentIndex !== null ? (
        // Event Selection Form for a specific student
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={selectedEvents[students[currentStudentIndex]?.studentName] || []}
          onSubmit={handleEventSubmit}
        />
      ) : showFinalReview ? (
        // Final Review Page
        <div className="container finalize-registration">
          <h2>Final Review</h2>
          <ul>
            {students.map((student) => (
              <li key={student.studentName}>
                <strong>{student.studentName}</strong>:{" "}
                {selectedEvents[student.studentName]?.join(", ") || "No events selected"}
              </li>
            ))}
          </ul>
          <button onClick={() => alert("Registration Complete!")}>Finalize Registration</button>
        </div>
      ) : (
        // Student Verification Page
        <StudentVerificationPage
          students={students}
          selectedEvents={selectedEvents}
          onAddStudent={handleStudentSubmit}
          onEditStudent={handleStudentEdit}
          onAddEvents={handleAddEvents}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  );
}

export default App;
