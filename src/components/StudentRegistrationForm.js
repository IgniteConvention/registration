import React, { useState } from "react";

export default function StudentRegistrationForm({ onSubmit, onNextStep }) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [students, setStudents] = useState([]);

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
    const student = { studentName, studentDOB, studentGender };
    setStudents([...students, student]);
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
    onSubmit(student);
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
      {students.length > 0 && (
        <button onClick={onNextStep}>Next: Select Events</button>
      )}
    </div>
  );
}
