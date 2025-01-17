import React, { useState } from "react";

const StudentRegistrationForm = ({ onSubmit, onNextStep, students }) => {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [age, setAge] = useState("");

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setStudentDOB(dob);
    calculateAge(dob);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { studentName, studentDOB, studentGender, studentAge: age };
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

      {/* Display the list of students for verification */}
      {students.length > 0 && (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.studentName} - {student.studentAge} years old
            </li>
          ))}
        </ul>
      )}

      {students.length > 0 && (
        <button onClick={onNextStep}>Next: Select Events</button>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
