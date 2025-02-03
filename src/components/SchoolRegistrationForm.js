import React, { useState } from "react";

export default function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [pastorName, setPastorName] = useState("");
  const [sponsors, setSponsors] = useState([
    { name: "", willingToJudge: false, judgingCategories: "" }
  ]);

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index][field] = value;
    setSponsors(updatedSponsors);
  };

  const addSponsor = () => {
    setSponsors([...sponsors, { name: "", willingToJudge: false, judgingCategories: "" }]);
  };

  const removeSponsor = (index) => {
    setSponsors(sponsors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ schoolName, schoolAddress, contactName, contactPhone, contactEmail, pastorName, sponsors });
  };

  return (
    <div className="container">
      <h2>School Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>School Name: <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required /></label>
        <label>School Address: <input type="text" value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} required /></label>
        <label>Contact Person: <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required /></label>
        <label>Contact Phone: <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required /></label>
        <label>Contact Email: <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required /></label>
        <label>Pastor's Name: <input type="text" value={pastorName} onChange={(e) => setPastorName(e.target.value)} /></label>
        
        <h3>Sponsors</h3>
        {sponsors.map((sponsor, index) => (
          <div key={index}>
            <label>Name: <input type="text" value={sponsor.name} onChange={(e) => handleSponsorChange(index, "name", e.target.value)} required /></label>
            <label>Willing to Judge: <input type="checkbox" checked={sponsor.willingToJudge} onChange={(e) => handleSponsorChange(index, "willingToJudge", e.target.checked)} /></label>
            {sponsor.willingToJudge && <label>Judging Categories: <textarea value={sponsor.judgingCategories} onChange={(e) => handleSponsorChange(index, "judgingCategories", e.target.value)} /></label>}
            <button type="button" onClick={() => removeSponsor(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSponsor}>Add Sponsor</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
