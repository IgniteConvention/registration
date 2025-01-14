import React, { useState } from 'react';

export default function StudentRegistrationForm({ onSubmit }) {
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGender, setStudentGender] = useState('Male');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, studentAge, studentGender });
    setStudentName('');
    setStudentAge('');
    setStudentGender('Male');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={studentAge}
          onChange={(e) => setStudentAge(e.target.value)}
          required
        />
      </label>
      <label>
        Gender:
        <select
          value={studentGender}
          onChange={(e) => setStudentGender(e.target.value)}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <button type="submit">Add Student</button>
    </form>
  );
}
