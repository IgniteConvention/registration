import React, { useState } from 'react';

function SchoolRegistrationForm({ onSubmit }) {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [pastorName, setPastorName] = useState('');
  
  const [sponsors, setSponsors] = useState([{ name: '', willingToJudge: false, events: [] }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ schoolName, schoolAddress, contactName, contactPhone, contactEmail, pastorName, sponsors });
  };

  const handleSponsorChange = (index, field, value) => {
    const newSponsors = [...sponsors];
    newSponsors[index][field] = value;
    setSponsors(newSponsors);
  };

  const addSponsor = () => {
    setSponsors([...sponsors, { name: '', willingToJudge: false, events: [] }]);
  };

  return (
    <div>
      <h2>Register School</h2>
      <form onSubmit={handleSubmit}>
        <label>
          School Name:
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </label>
        <label>
          School Address:
          <input type="text" value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} />
        </label>
        <label>
          Contact Person Name:
          <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
        </label>
        <label>
          Contact Person Phone:
          <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        </label>
        <label>
          Contact Person Email:
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </label>
        <label>
          Pastor's Name:
          <input type="text" value={pastorName} onChange={(e) => setPastorName(e.target.value)} />
        </label>
        
        <h3>Sponsors/Chaperones</h3>
        {sponsors.map((sponsor, index) => (
          <div key={index}>
            <label>
              Sponsor/Chaperone Name:
              <input 
                type="text" 
                value={sponsor.name} 
                onChange={(e) => handleSponsorChange(index, 'name', e.target.value)} 
              />
            </label>
            <label>
              Willing to help judge events:
              <input 
                type="checkbox" 
                checked={sponsor.willingToJudge} 
                onChange={(e) => handleSponsorChange(index, 'willingToJudge', e.target.checked)} 
              />
            </label>
            {sponsor.willingToJudge && (
              <label>
                Events they can judge:
                <input 
                  type="text" 
                  value={sponsor.events.join(', ')} 
                  onChange={(e) => handleSponsorChange(index, 'events', e.target.value.split(','))} 
                />
              </label>
            )}
            <br />
          </div>
        ))}
        <button type="button" onClick={addSponsor}>Add Sponsor/Chaperone</button>

        <button type="submit">Register School</button>
      </form>
    </div>
  );
}

export default SchoolRegistrationForm;
