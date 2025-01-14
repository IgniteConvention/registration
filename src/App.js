import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  // Handle school registration submission
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
  };

  // Handle student registration submission
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

  // Handle student edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  // Complete the registration process
  const handleCompleteRegistration = () => {
    setIsComplete(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>

      {!schoolData ? (
        // Show school registration form
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        // Show student registration form if registration is incomplete
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
                  <button onClick={() => handleEditStudent(student)}>Edit</button>
                  <button onClick={() => console.log(`Add events for ${student.studentName}`)}>
                    Add Events
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleCompleteRegistration}>
            Complete Registration
          </button>
        </>
      ) : (
        // Show confirmation once registration is complete
        <div>
          <h2>Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student.studentName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
