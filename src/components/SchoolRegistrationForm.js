import React, { useState } from "react";

export default function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolContact, setSchoolContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ schoolName, schoolContact });
    setSchoolName("");
    setSchoolContact("");
  };

  return (
    <div className="container">
      <h1>Ignite Student Convention</h1>
      <div className="welcome-message">
        Welcome to the Ignite Student Convention Registration process. Please fill out the
        requested information below.
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          School Name:
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </label>
        <label>
          School Contact:
          <input
            type="text"
            value={schoolContact}
            onChange={(e) => setSchoolContact(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
