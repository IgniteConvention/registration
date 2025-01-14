import React, { useState } from "react";

export default function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [pastorName, setPastorName] = useState("");
  const [sponsors, setSponsors] = useState("");
  const [willingToJudge, setWillingToJudge] = useState(false);
  const [judgingCategories, setJudgingCategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      schoolName,
      schoolEmail,
      pastorName,
      sponsors,
      willingToJudge,
      judgingCategories,
    });
    setSchoolName("");
    setSchoolEmail("");
    setPastorName("");
    setSponsors("");
    setWillingToJudge(false);
    setJudgingCategories("");
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
          School Email:
          <input
            type="email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Pastor's Name:
          <input
            type="text"
            value={pastorName}
            onChange={(e) => setPastorName(e.target.value)}
            required
          />
        </label>
        <label>
          Sponsors/Chaperones:
          <textarea
            value={sponsors}
            onChange={(e) => setSponsors(e.target.value)}
            placeholder="List sponsors/chaperones attending"
          />
        </label>
        <label>
          Willing to Judge:
          <input
            type="checkbox"
            checked={willingToJudge}
            onChange={(e) => setWillingToJudge(e.target.checked)}
          />
        </label>
        {willingToJudge && (
          <label>
            Judging Categories:
            <textarea
              value={judgingCategories}
              onChange={(e) => setJudgingCategories(e.target.value)}
              placeholder="List categories you are willing to judge"
            />
          </label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
