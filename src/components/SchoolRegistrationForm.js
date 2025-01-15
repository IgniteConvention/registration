import React, { useState } from "react";

export default function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [pastorName, setPastorName] = useState("");
  const [sponsors, setSponsors] = useState([
    { name: "", willingToJudge: false, judgingCategories: "" },
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
    onSubmit({
      schoolName,
      schoolAddress,
      contactName,
      contactPhone,
      contactEmail,
      pastorName,
      sponsors,
    });
    setSchoolName("");
    setSchoolAddress("");
    setContactName("");
    setContactPhone("");
    setContactEmail("");
    setPastorName("");
    setSponsors([{ name: "", willingToJudge: false, judgingCategories: "" }]);
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
          School Address:
          <input
            type="text"
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Contact Person:
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContact
