import React, { useState } from "react";

export default function StudentRegistrationForm({ onSubmit, students, onEdit }) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [editingIndex, setEditingIndex] = useState(null);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(studentDOB) > new Date()) {
      alert("Invalid date of birth.");
      return;
    }
    const student = {
      studentName,
      studentDOB,
      studentGender,
      studentAge: calculateAge(studentDOB),
    };
    if (editingIndex !== null) {
      onEdit(editingIndex, student);
      setEditingIndex(null);
    } else {
      onSubmit(student);
    }
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
  };

  const handleEdit = (index) => {
    const student = students[index];
    setStudentName(student.studentName);
    setStudentDOB(student.studentDOB);
    setStudentGender(student.studentGender);
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required /></label>
        <label>DOB: <input type="date" value={studentDOB} onChange={(e) => setStudentDOB(e.target.value)} required /></label>
        <label>Gender: <select value={studentGender} onChange={(e) => setStudentGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select></label>
        <button type="submit">{editingIndex !== null ? "Update Student" : "Add Student"}</button>
      </form>

      <h3>Students Registered:</h3>
      {students.length > 0 && (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.studentName} - {student.studentAge} years old ({student.studentGender})
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
