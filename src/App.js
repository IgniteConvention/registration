import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
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
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleCompleteRegistration = () => {
    setIsComplete(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      <div className="welcome-message">
        {!schoolData && (
          <p>Welcome to the Ignite Student Convention Registration process! Please enter the requested information below.</p>
        )}
        {schoolData && !isComplete && (
          <p>
            Please enter each of your students' information. Once all students are entered, you can verify and/or edit
            them on the next screen prior to selecting events.
          </p>
        )}
        {isComplete && (
          <p>
            Please verify that all of your students are entered and their information is correct. When ready, please add
            the events your students have registered for. Be sure to include group identifiers (e.g., "Group A" for
            Bible Bowl) and reference the Handbook for entry limits and other rules/qualifications.
          </p>
        )}
      </div>

      <div className="container">
        {!schoolData ? (
          <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
        ) : !isComplete ? (
          <>
            <StudentRegistrationForm
              onSubmit={handleStudentSubmit}
              student={editingStudent}
            />
            <div>
              <h2>Registered Students:</h2>
              <ul>
                {students.map((student, index) => (
                  <li key={index}>
                    {student.studentName} - {student.studentAge} years old (
                    {student.studentGender})
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleCompleteRegistration}>
              Complete Registration
            </button>
          </>
        ) : (
          <div>
            <h2>Registration Complete</h2>
            <p>School Name: {schoolData.schoolName}</p>
            <h3>Registered Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  <p>
                    <strong>Name:</strong> {student.studentName} <br />
                    <strong>Age:</strong> {student.studentAge} <br />
                    <strong>Gender:</strong> {student.studentGender} <br />
                    <strong>Other Info:</strong> {/* Add additional student fields here */}
                  </p>
                  <div className="button-group">
                    <button onClick={() => handleEditStudent(student)}>Edit</button>
                    <button onClick={() => console.log(`Add events for ${student.studentName}`)}>
                      Add Events
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
