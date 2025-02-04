// App.js
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
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
  const [testMessage, setTestMessage] = useState("");

  const handleSchoolSubmit = async (school) => {
    try {
      await setDoc(doc(db, "schools", school.schoolName), school);
      console.log("✅ School data saved:", school);
    } catch (error) {
      console.error("❌ Error saving school data:", error);
    }
    setSchoolData(school);
  };

  const handleStudentSubmit = async (student) => {
    try {
      const schoolRef = doc(db, "schools", schoolData.schoolName);
      const studentsRef = doc(schoolRef, "students", student.studentName);
      await setDoc(studentsRef, student);
      console.log("✅ Student data saved:", student);
    } catch (error) {
      console.error("❌ Error saving student data:", error);
    }
    setStudents((prev) => [...prev, student]);
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
          <StudentRegistrationForm onSubmit={handleStudentSubmit} students={students} />
          <h3>Students Registered:</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.studentName} - {student.studentAge} years old ({student.studentGender})
                <button onClick={() => handleEditEvents(student.studentName)}>Edit Events</button>
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
        <FinalReviewPage students={students} selectedEvents={selectedEvents} onEditEvents={handleEditEvents} />
      ) : (
        <StudentVerificationPage students={students} selectedEvents={selectedEvents} onAddEvents={handleAddEvents} onFinalize={handleFinalize} />
      )}
    </div>
  );
}

export default App;
