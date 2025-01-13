import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventRegistrationForm from './components/EventRegistrationForm';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState({}); // To store events for each student
  const [isEventRegistration, setIsEventRegistration] = useState(false);

  const availableEvents = [
    {
      category: "Athletics",
      events: [
        "Soccer Kick (M)", "Soccer Kick (F)", "Basketball (M)", "Basketball (F)",
        "Shotput (M)", "Shotput (F)", "Discus (M)", "Discus (F)", "Track and Field"
      ]
    },
    {
      category: "Instrumentals",
      events: [
        "Male Duet", "Freestyle Male Duet", "Female Duet", "Freestyle Female Duet",
        "Mixed Duet", "Freestyle Mixed Duet", "Male Trio", "Freestyle Male Trio",
        "Female Trio", "Freestyle Female Trio", "Mixed Trio", "Freestyle Mixed Trio",
        "Male Quartet", "Freestyle Male Quartet", "Female Quartet", "Freestyle Female Quartet",
        "Mixed Quartet", "Freestyle Mixed Quartet", "Small Ensemble", "Freestyle Small Ensemble"
      ]
    },
    {
      category: "Dramatics",
      events: [
        "Dramatic Monologue", "Expressive Recitation Male", "Expressive Recitation Female",
        "Poetry Recitation Male", "Poetry Recitation Female", "Dramatic Dialogue", "Clown Act",
        "Ventriloquism", "Skit", "Oratory", "Preaching (M) 13-15"
      ]
    },
    {
      category: "Academic",
      events: [
        "Spelling", "Academic Bowl", "Chess", "Table Tennis", "Checkers", "Bible Memory Bee"
      ]
    },
    {
      category: "Creative",
      events: [
        "Art Showcase", "Oil Painting", "Water Color", "Graphic Design", "Website Design", "Service Recap Video Presentation"
      ]
    },
    {
      category: "Other",
      events: [
        "Golden Harp Award", "Social Studies-Research", "Social Studies-Theoretical", "Social Studies-Collection"
      ]
    }
  ];

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
  };

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

  const handleEventSubmit = (studentName, selectedEventsForStudent) => {
    setSelectedEvents((prevEvents) => ({
      ...prevEvents,
      [studentName]: selectedEventsForStudent
    }));
    console.log(`Events for ${studentName}:`, selectedEventsForStudent);
    setIsEventRegistration(false); // Return to the student registration flow after submitting events
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEventRegistration(false);
  };

  const handleStartEventRegistration = (student) => {
    setEditingStudent(student); // Set the student to edit
    setIsEventRegistration(true); // Show the event registration form
  };

  return (
    <div className="App">
      <h1>Registration System</h1>

      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          student={editingStudent}
        />
      ) : isEventRegistration ? (
        <EventRegistrationForm
          student={editingStudent}
          onSubmit={handleEventSubmit}
          availableEvents={availableEvents}
        />
      ) : (
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
          <button onClick={() => setIsComplete(true)}>Finish Registration</button>
        </div>
      )}
    </div>
  );
}

export default App;
