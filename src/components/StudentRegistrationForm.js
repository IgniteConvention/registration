import React, { useState } from 'react';
import './StudentRegistrationForm.css'; // Import the CSS file

function StudentRegistrationForm({ onSubmit }) {
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGender, setStudentGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ studentName, studentDOB, studentAge, studentGender });
    // Reset the form for the next student
    setStudentName('');
    setStudentDOB('');
    setStudentAge('');
    setStudentGender('');
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Student Registration</h2>
        
        <p className="reminder">
          Please ensure all necessary forms have been signed and are on file (Permission to Attend (CF6), Medical Forms CF7 (and CF8-if applicable) – one per person attending the convention. CF forms can be found on the Google Drive. Medical forms must have the date of the last tetanus shot.) You may bring these to the Convention or upload them to the Google Drive (preferable).
        </p>
        
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={studentDOB}
              onChange={(e) => setStudentDOB(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
            />
          </label>
          <label>
            Gender:
            <select
              value={studentGender}
              onChange={(e) => setStudentGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <button type="submit">Register Student</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistrationForm;
