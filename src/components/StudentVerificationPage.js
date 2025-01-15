import React, { useState } from "react";

export default function StudentVerificationPage({
  students,
  selectedEvents,
  onAddStudent,
  onEditStudent,
  onAddEvents,
  onFinalize,
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
            {selectedEvents[student.studentName]?.length > 0 ? (
              selectedEvents[student.studentName].map((event, eventIndex) => (
                <span key={eventIndex}>{event}</span>
              ))
            ) : (
              <em>No events selected</em>
            )}
          </p>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => onAddEvents(student.studentName)}>
            Add Events
          </button>
        </div>
      ))}
      <div className="form">
        <h3>{editingIndex !== null ? "Edit Student" : "Add Student"}</h3>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
        />
        <input
          type="date"
          value={studentDOB}
          onChange={(e) => setStudentDOB(e.target.value)}
          placeholder="Date of Birth"
        />
        <select
          value={studentGender}
          onChange={(e) => setStudentGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button onClick={handleSave}>
          {editingIndex !== null ? "Save Changes" : "Add Student"}
        </button>
      </div>
      <button onClick={onFinalize} className="finalize-button">
        Finalize
      </button>
    </div>
  );
}