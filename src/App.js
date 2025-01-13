import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

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
    setIsComplete(false);
  };

  // Handle completion of registration (finalize process)
  const handleCompleteRegistration = () => {
    setIsComplete(true);
  };

  // Handle editing a specific student
  const handleEditStudent = (student) => {
    setEditingStudent(student); // Set the student to be edited
    setIsComplete(false); // Keep the form visible for editing
  };

  // Handle event registration
  const handleEventRegistration = () => {
    console.log("Starting event registration");
    // Logic for moving to the event registration page will go here
  };

  return (
    <div className="App">
      <h1>Registration System</h1>

      {/* School registration form */}
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        // Student registration form
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          student={editingStudent}
        />
      ) : (
        // After registration is complete, show the confirmation page
        <div className="confirmation-container">
          <h2>Registration Complete</h2>
          <p><strong>School Name:</strong> {schoolData.schoolName}</p>
          <h3>Students Registered:</h3>
          <ul className="student-list">
            {students.map((student, index) => (
              <li key={index} className="student-item">
                <span>{student.studentName}</span>
                <button 
                  onClick={() => handleEditStudent(student)} 
                  className="edit-button">
                  Edit
                </button>
              </li>
            ))}
          </ul>
          <div className="buttons">
            <button onClick={handleCompleteRegistration} className="finish-button">
              Finish Registration
            </button>
            <button onClick={handleEventRegistration} className="event-button">
              Start Adding Events
            </button>
          </div>
        </div>
      )}

      {/* Show options after each student is added */}
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
