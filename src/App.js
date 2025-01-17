import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";
import eventsList from "./events"; // Import the events list from the new events.js

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [showFinalReview, setShowFinalReview] = useState(false);

  // Handle school data submission
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  // Handle student registration form submission (multiple students)
  const handleStudentSubmit = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  // Handle student editing (edit student info)
  const handleStudentEdit = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  // Handle event submission for each student
  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));
    setCurrentStudentIndex(null); // Reset to go back to student verification
  };

  // Set current student for event selection
  const handleAddEvents = (index) => {
    setCurrentStudentIndex(index);
  };

  // Final review page
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
        // Student Registration Form: Multiple students can be added
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          students={students} // Pass the list of students entered
        />
      ) : currentStudentIndex !== null ? (
        // Event Selection Form for a specific student
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={eventsList} // Use events list
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
          <button onClick={() => alert("Registration Complete!")}>
            Finalize Registration
          </button>
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
