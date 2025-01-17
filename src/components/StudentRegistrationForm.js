import React from "react";

const StudentVerificationPage = ({
  students,
  selectedEvents,
  onAddStudent,
  onEditStudent,
  onAddEvents,
  onFinalize,
}) => {
  return (
    <div className="container">
      <h2>Student Verification</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.studentName} - {student.studentAge} years old{" "}
            <button onClick={() => onEditStudent(index, student)}>Edit</button>
            <button onClick={() => onAddEvents(index)}>Add Events</button>
          </li>
        ))}
      </ul>
      {students.length > 0 && <button onClick={onFinalize}>Finalize Registration</button>}
    </div>
  );
};

export default StudentVerificationPage;
