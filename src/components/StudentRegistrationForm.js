import React, { useState } from "react";

export default function StudentRegistrationForm({ onSubmit }) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [studentAge, setStudentAge] = useState("");

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
    setStudentAge(calculateAge(dob));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, studentDOB, studentGender, studentAge });
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
    setStudentAge("");
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
        {studentAge && (
          <p>
            <strong>Age:</strong> {studentAge}
          </p>
        )}
        <label>
          Gender:
          <select
            value={studentGender}
            onChange={(e) => setStudentGender(e.target.value)}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
