import React from "react";

export default function StudentVerificationPage({
  students,
  selectedEvents,
  onAddStudent,
  onEditStudent,
  onAddEvents,
  onFinalize
}) {
  return (
    <div className="container">
      <h2>Student Verification</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.studentName}</strong> - {student.studentDOB}
            <button onClick={() => onEditStudent(index, student)}>
              Edit Student
            </button>
            <button onClick={() => onAddEvents(index)}>
              Add Events
            </button>
            <div>
              <strong>Selected Events:</strong>
              {selectedEvents[student.studentName]
                ? selectedEvents[student.studentName].join(", ")
                : "None yet"}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onFinalize}>Finalize Registration</button>
    </div>
  );
}
