import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventRegistrationForm from './components/EventRegistrationForm';
import './App.css';  // Import the CSS file

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState({});

  // List of available events (from the event list)
  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design", "Service Recap Video Presentation", "Graphic Design", "Persuasive Video", 
      "Scripture Video", "Radio Program"
    ],
    "Academic Division (Performance)": [
      "Bible Memory Bee", "Academic Bowl", "Bible Bowl"
    ],
    "Athletics (Male)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run", "1600 Meter Run", 
      "400 Meter Relay", "1600 Meter Relay", "Soccer Kick", "Physical Fitness", "Table Tennis", "Basketball", 
      "Long Jump", "Archery - Compound Bow", "Archery - Traditional Instinctive", 
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    "Athletics (Female)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run", "1600 Meter Run", 
      "400 Meter Relay", "1600 Meter Relay", "Soccer Kick", "Physical Fitness", "Table Tennis", "Volleyball", 
      "Archery - Compound Bow", "Archery - Traditional Instinctive", 
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    // Add the rest of the categories and events as needed...
  };

  // Handle submission of school registration form
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
  };

  // Handle submission of student registration form
  const handleStudentSubmit = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.studentName === editingStudent.studentName ? student : s
        )
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, student]);
    }
    console.log('Student Data Submitted:', student);
  };

  // Handle adding another student
  const handleAddAnotherStudent = () => {
    setEditingStudent(null); // Reset the editing state to add a new student
  };

  // Handle event registration for the student
  const handleEventSubmit = (studentName, selectedEventsForStudent) => {
    setSelectedEvents((prevEvents) => ({
      ...prevEvents,
      [studentName]: selectedEventsForStudent,
    }));
    console.log(`Events for ${studentName}:`, selectedEventsForStudent);
  };

  // Handle editing a specific student
  const handleEditStudent = (student) => {
    setEditingStudent(student); // Set the student to be edited
  };

  // Handle completion of registration
  const handleCompleteRegistration = () => {
    setIsComplete(true); // Mark registration as complete and show confirmation
  };

  return (
    <div className="App">
      <h1>Registration System</h1>

      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        // Show the student registration form if registration isn't complete
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          student={editingStudent} // Ensure this is passed correctly
        />
      ) : isComplete && students.length > 0 ? (
        // Show confirmation page when registration is complete
        <div className="confirmation-container">
          <h2>Registration Complete</h2>
          <p><strong>School Name:</strong> {schoolData.schoolName}</p>
          <h3>Students Registered:</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.studentName} - {student.studentAge} years old ({student.studentGender})
                <button onClick={() => handleEditStudent(student)}>Edit</button>
                <button onClick={() => handleStartEventRegistration(student)}>
                  Add Events
                </button>
                <div>
                  <strong>Selected Events:</strong>
                  {selectedEvents[student.studentName]
                    ? selectedEvents[student.studentName].join(', ')
                    : 'None yet'}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Show the event registration form if not complete
        <EventRegistrationForm
          student={editingStudent}
          onSubmit={handleEventSubmit}
          availableEvents={availableEvents}
        />
      )}

      {/* Show buttons for adding a student or completing registration */}
      {students.length > 0 && !isComplete && (
        <div>
          <button onClick={handleAddAnotherStudent}>Add Another Student</button>
          <button onClick={handleCompleteRegistration}>Complete Registration</button>
        </div>
      )}
    </div>
  );
}

export default App;
