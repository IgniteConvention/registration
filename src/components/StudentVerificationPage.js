import React, { useState } from "react";

export default function StudentVerificationPage({
  students,
  selectedEvents,
  onAddStudent,
  onEditStudent,
  onAddEvents,
  onFinalize
}) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    const student = students[index];
    setStudentName(student.studentName);
    setStudentDOB(student.studentDOB);
    setStudentGender(student.studentGender);
    setEditingIndex(index);
  };

  const handleSave = () => {
    const updatedStudent = { studentName, studentDOB, studentGender };
    if (editingIndex !== null) {
      onEditStudent(editingIndex, updatedStudent);
    } else {
      onAddStudent(updatedStudent);
    }
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <h2>Verify Students</h2>
      {students.map((student, index) => (
        <div key={index} className="student-entry">
          <p>
            <strong>Name:</strong> {student.studentName} <br />
            <strong>DOB:</strong> {student.studentDOB} <br />
            <strong>Gender:</strong> {student.studentGender} <br />
            <strong>Events:</strong>{" "}
            {selectedEvents[student.studentName]?.map(
