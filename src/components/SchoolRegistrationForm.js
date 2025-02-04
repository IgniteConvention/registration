import React, { useState, useEffect } from "react";

export default function SchoolRegistrationForm({ schoolData, onSubmit }) {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    pastorName: "",
    sponsors: [{ name: "", willingToJudge: false, judgingCategories: "" }],
  });

  useEffect(() => {
    if (schoolData) setFormData(schoolData);
  }, [schoolData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...formData.sponsors];
    updatedSponsors[index][field] = value;
    setFormData({ ...formData, sponsors: updatedSponsors });
  };

  const addSponsor = () => {
    setFormData({
      ...formData,
      sponsors: [...formData.sponsors, { name: "", willingToJudge: false, judgingCategories: "" }],
    });
  };

  const removeSponsor = (index) => {
    setFormData({
      ...formData,
      sponsors: formData.sponsors.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>School Name:</label>
        <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} required />

        <label>Contact Person:</label>
        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="contactEmail" value={formData.contactEmail} readOnly />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <label>Pastor's Name:</label>
        <input type="text" name="pastorName" value={formData.pastorName} onChange={handleChange} />

        <h3>Sponsors</h3>
        {formData.sponsors.map((sponsor, index) => (
          <div key={index}>
            <label>Name:</label>
            <input
              type="text"
              value={sponsor.name}
              onChange={(e) => handleSponsorChange(index, "name", e.target.value)}
            />
            <label>Willing to Judge:</label>
            <input
              type="checkbox"
              checked={sponsor.willingToJudge}
              onChange={(e) => handleSponsorChange(index, "willingToJudge", e.target.checked)}
            />
            {sponsor.willingToJudge && (
              <label>Judging Categories:
                <textarea
                  value={sponsor.judgingCategories}
                  onChange={(e) => handleSponsorChange(index, "judgingCategories", e.target.value)}
                />
              </label>
            )}
            <button type="button" onClick={() => removeSponsor(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSponsor}>Add Sponsor</button>
        <button type="submit">Save School Details</button>
      </form>
    </div>
  );
}
