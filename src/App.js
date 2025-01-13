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
      // If editing an existing student, update the student data
      setStudents(
        students.map((s) =>
          s.studentName === editingStudent.studentName ? student : s
        )
      );
      setEditingStudent(null);
    } else {
      // Otherwise, add the new student
      setStudents([...students, student]);
    }
    console.log('Student Data Submitted:', student);
  };

  // Handle adding another student
  const handleAddAnotherStudent = () => {
    setIsComplete(false); // Keep the student form visible for next submission
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

  return (
    <div className="App">
      <h1>Registration System</h1>

      {/* Display School Registration Form if no school data yet */}
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        // Show Student Registration Form if students are not completed
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          student={editingStudent}
        />
      ) : (
        // After all students are registered, show the confirmation page
        <div>
          <h2>Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <h3>Students Registered:</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.studentName} - {student.studentAge} years old ({student.studentGender})
                <button onClick={() => handleEditStudent(student)}>Edit</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCompleteRegistration}>Finish Registration</button>
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
