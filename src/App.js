import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';

function App() {
  const [schoolData, setSchoolData] = useState(null);

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
    // In a real application, you would typically send this data to a backend or store it.
  };

  return (
    <div className="App">
      <h1>Registration System</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : (
        <div>
          <h2>School Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <p>Contact Person: {schoolData.contactName}</p>
          <p>Pastor: {schoolData.pastorName}</p>
          <h3>Sponsors/Chaperones:</h3>
          {schoolData.sponsors.map((sponsor, index) => (
            <div key={index}>
              <p>Sponsor Name: {sponsor.name}</p>
              <p>Willing to Judge: {sponsor.willingToJudge ? 'Yes' : 'No'}</p>
              {sponsor.willingToJudge && (
                <p>Events they can judge: {sponsor.events.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
