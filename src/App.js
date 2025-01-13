import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventRegistrationForm from './components/EventRegistrationForm';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [isEventRegistration, setIsEventRegistration] = useState(false);

  const availableEvents = [
    // Add your available events here as before
  ];

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

  // Handle completion of registration (finalize process)
  const handleCompleteRegistration = () => {
    setIsComplete(true); // Mark registration as complete
  };

  // Handle event registration for the student
  const handleEventSubmit = (studentName, selectedEventsForStudent) => {
    setSelectedEvents((prevEvents) => ({
      ...prevEvents,
      [studentName]: selectedEventsForStudent,
    }));
    console.log(`Events for ${studentName}:`, selectedEventsForStudent);
    setIsEventRegistration(false); // Return to the student registration flow after submitting events
  };

  // Handle editing a specific student
  const handleEditStudent = (student) => {
    setEditingStudent(student); // Set the student to be edited
    setIsEventRegistration(false);
  };

  // Handle event registration
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
        // Show the student registration form if registration isn't complete
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
          <button onClick={handleCompleteRegistration}>Finish Registration</button>
        </div>
      )}

      {/* Show options after at least one student is added */}
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
