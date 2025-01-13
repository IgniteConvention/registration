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
    "Art (Performance)": [
      "Painting", "Drawing", "Photography", "Graphic Design", "Sculpture"
    ],
    "Dramatics (Performance)": [
      "One Act Play", "Skit", "Small Ensemble", "Sign Language Team (5-10)", 
      "Sign Language Team (11-20)", "Illustrated Story", "Puppets", "Famous Speech"
    ],
    "Instrumentals (Performance)": [
      "Solo Brass", "Solo Woodwind", "Solo Percussion", "Solo Strings", "Solo Miscellaneous", 
      "Duet Instrumental", "Ensemble"
    ],
    "Miscellaneous": [
      "Golden Harp", "Golden Lamb", "Golden Apple", "Christian Service (Discipleship Award)", 
      "Christian Soldier Award", "Christian Worker Award"
    ]
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

  return (
    <div className="App">
      <h1>Registration System</h1>

      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          student={editingStudent} // Ensure this is passed correctly
        />
      ) : (
        <EventRegistrationForm
          student={editingStudent} // Ensure this is passed correctly
          onSubmit={handleEventSubmit}
          availableEvents={availableEvents}
        />
      )}

      {/* Add buttons for adding a student or completing registration */}
      {students.length > 0 && !isComplete && (
        <div>
          <button onClick={handleAddAnotherStudent}>Add Another Student</button>
          <button onClick={() => setIsComplete(true)}>Complete Registration</button>
        </div>
      )}
    </div>
  );
}

export default App;
