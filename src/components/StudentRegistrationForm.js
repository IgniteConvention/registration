import React, { useState } from "react";

export default function StudentRegistrationForm({ onSubmit, onNextStep }) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { studentName, studentDOB, studentGender };
    onSubmit(student);  // Submit student data
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
            onChange={(e) => setStudentDOB(e.target.value)}
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
      {/* Enable Next step button only after at least one student is added */}
      {studentName && (
        <button onClick={onNextStep}>Next: Select Events</button>
      )}
    </div>
  );
}
