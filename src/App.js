import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import availableEvents from "./events"; // Import the event list
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});
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
      ) : students.length < 1 ? (
        // Student Registration Form: Should allow multiple students to be added
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          students={students} // This passes the list of students entered so far
        />
      ) : currentStudentIndex !== null ? (
        // Event Selection Form for a specific student
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents} // This should now be populated with all events
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
        // Student Verification Page: Shows entered students and allows edits
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
