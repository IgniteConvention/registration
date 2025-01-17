import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [showFinalReview, setShowFinalReview] = useState(false);

  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design",
      "Service Recap Video Presentation",
      "Graphic Design",
      "Persuasive Video",
      "Scripture Video",
      "Radio Program"
    ],
    // Continue adding the other event categories here...
  };

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  const handleStudentSubmit = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleStudentEdit = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));
    setCurrentStudentIndex(null);
  };

  const handleAddEvents = (index) => {
    setCurrentStudentIndex(index);
  };

  const handleFinalize = () => {
    setShowFinalReview(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : currentStudentIndex !== null ? (
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={
            selectedEvents[students[currentStudentIndex]?.studentName] || []
          }
          onSubmit={handleEventSubmit}
        />
      ) : showFinalReview ? (
        <div className="container finalize-registration">
          <h2>Final Review</h2>
          <ul>
            {students.map((student) => (
              <li key={student.studentName}>
                <strong>{student.studentName}</strong>:{" "}
                {selectedEvents[student.studentName]?.join(", ") ||
                  "No events selected"}
              </li>
            ))}
          </ul>
          <button onClick={() => alert("Registration Complete!")}>
            Finalize Registration
          </button>
        </div>
      ) : (
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
