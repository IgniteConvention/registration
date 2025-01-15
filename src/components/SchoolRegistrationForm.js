import React, { useState } from "react";

export default function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState("");
  const [contactName, setContactName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ schoolName, contactName });
  };

  return (
    <div className="container school-registration">
      <h2>School Registration</h2>
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
          Contact Person:
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
