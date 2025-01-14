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
    "Academic Division": ["Math", "Science", "History"],
    "Athletics": ["100m Dash", "400m Relay"],
    "Music": ["Choir", "Solo Singing"],
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
        <div>
          <h2>Registration Complete</h2>
          {students.map((student) => (
            <div key={student.studentName}>
              <p>
                {student.studentName} - Events:{" "}
                {selectedEvents[student.studentName]
                  ? selectedEvents[student.studentName].map((e) => e.eventName).join(", ")
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
