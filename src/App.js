import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);

  // Handle submission of school registration form
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
  };

  // Handle submission of student registration form
  const handleStudentSubmit = (student) => {
    setStudents([...students, student]);
    console.log('Student Data Submitted:', student);
  };

  return (
    <div className="App">
      <h1>Registration System</h1>
      
      {/* Display School Registration Form if no school data yet */}
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !students.length ? (
        // Display Student Registration Form if no students yet
        <StudentRegistrationForm onSubmit={handleStudentSubmit} />
      ) : (
        <div>
          <h2>Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <h3>Students Registered:</h3>
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
