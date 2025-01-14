import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventSelectionForm from './components/EventSelectionForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design", "Service Recap Video Presentation", "Graphic Design",
      "Persuasive Video", "Scripture Video", "Radio Program"
    ],
    "Academic Division (Performance)": ["Bible Memory Bee", "Academic Bowl", "Bible Bowl"],
    "Academic Division (Non-Performance)": ["Checkers", "Chess", "Spelling"],
    "Athletics (Male)": ["100 Meter Dash", "400 Meter Relay", "Basketball"],
    "Athletics (Female)": ["100 Meter Dash", "400 Meter Relay", "Volleyball"],
    "Music Division (Performance)": [
      "Male Solo", "Female Solo", "Small Ensemble", "Instrumental Ensemble"
    ],
    "Dramatics": ["Skit", "Radio Program"],
    // Add all remaining categories and events here
  };

  const handleSchoolSubmit = (school) => setSchoolData(school);
  const handleStudentSubmit = (student) => setStudents([...students, student]);
  const handleCompleteRegistration = () => setIsComplete(true);
  const handleStartEventSelection = (student) => setCurrentStudent(student);

  const handleEventSubmit = (studentName, selectedEventsForStudent) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [studentName]: selectedEventsForStudent,
    }));
    setCurrentStudent(null); // Exit event selection mode
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        <>
          <StudentRegistrationForm onSubmit={handleStudentSubmit} />
          <button onClick={handleCompleteRegistration}>Complete Registration</button>
        </>
      ) : currentStudent ? (
        <EventSelectionForm
          student={currentStudent}
          availableEvents={availableEvents}
          onSubmit={handleEventSubmit}
        />
      ) : (
        <div className="container">
          <h2>Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <h3>Registered Students:</h3>
          {students.map((student) => (
            <div key={student.studentName}>
              <p>
                <strong>Name:</strong> {student.studentName} <br />
                <strong>DOB:</strong> {student.studentDOB} <br />
                <strong>Gender:</strong> {student.studentGender} <br />
                <strong>Events:</strong>{" "}
                {selectedEvents[student.studentName]
                  ? selectedEvents[student.studentName]
                      .map((e) => `${e.eventName} (Group: ${e.group})`)
                      .join(", ")
                  : "None"}
              </p>
              <button onClick={() => handleStartEventSelection(student)}>
                Select Events
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
