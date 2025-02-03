import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import FinalReviewPage from "./components/FinalReviewPage";
import availableEvents from "./events";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [showFinalReview, setShowFinalReview] = useState(false);
  const [showEventSelection, setShowEventSelection] = useState(false);

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

  const handleRegisterForEvents = () => {
    setShowEventSelection(true);
  };

  const handleFinalize = () => {
    setShowFinalReview(true);
  };

  const handleEditEvents = (studentName) => {
    const studentIndex = students.findIndex(s => s.studentName === studentName);
    if (studentIndex !== -1) {
      setCurrentStudentIndex(studentIndex);
      setShowEventSelection(true);
    }
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>

      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !showEventSelection ? (
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
          selectedEventsForAll={selectedEvents}
          onEdit={handleEditEvents}
        />
      ) : showFinalReview ? (
        <FinalReviewPage
          students={students}
          selectedEvents={selectedEvents}
          onEditEvents={handleEditEvents}
        />
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
