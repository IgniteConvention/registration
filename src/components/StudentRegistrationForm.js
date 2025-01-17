import React, { useState } from "react";

const StudentRegistrationForm = ({ onSubmit, onNextStep, students }) => {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");

  // Calculate Age
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setStudentDOB(dob);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { studentName, studentDOB, studentGender, studentAge: calculateAge(studentDOB) };
    onSubmit(student);
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </label>
        <label>
          DOB:
          <input
            type="date"
            value={studentDOB}
            onChange={handleDOBChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            value={studentGender}
            onChange={(e) => setStudentGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <button type="submit">Add Student</button>
      </form>
      {/* Display the list of students */}
      {students && students.length > 0 && (
        <div>
          <h3>Students Added:</h3>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student.studentName}</li>
            ))}
          </ul>
        </div>
      )}
      {students.length > 0 && (
        <button onClick={onNextStep}>Next: Select Events</button>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
