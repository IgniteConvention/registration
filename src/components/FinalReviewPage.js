// FinalReviewPage.js
import React from "react";
import "./FinalReviewPage.css";

const FinalReviewPage = ({ students, selectedEvents, onEditEvents }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container finalize-registration">
      <h2>Final Review</h2>
      <p>Please review the students and their selected events before finalizing the registration.</p>
      <ul>
        {students.map((student) => (
          <li key={student.studentName}>
            <strong>{student.studentName}</strong>: {selectedEvents[student.studentName]?.map(e => e.eventName).join(", ") || "No events selected"}
            <button onClick={() => onEditEvents(student.studentName)}>Edit Events</button>
          </li>
        ))}
      </ul>
      <div className="button-group">
        <button className="finalize-button" onClick={() => alert("Registration Complete!")}>Finalize Registration</button>
        <button className="print-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default FinalReviewPage;
