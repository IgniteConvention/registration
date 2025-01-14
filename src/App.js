import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  const handleStudentSubmit = (student) => {
    setStudents([...students, student]);
  };

  const handleCompleteRegistration = () => {
    setIsComplete(true);
  };

  const handleSaveEdit = () => {
    setEditingIndex(null); // Exit editing mode
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      <div className="welcome-message">
        {!schoolData && (
          <p>Welcome to the Ignite Student Convention Registration process! Please enter the requested information below.</p>
        )}
        {schoolData && !isComplete && (
          <p>
            Please enter each of your students' information. Once all students are entered, you can verify and/or edit
            them on the next screen prior to selecting events.
          </p>
        )}
        {isComplete && (
          <p>
            Please verify that all of your students are entered and their information is correct. When ready, please add
            the events your students have registered for. Be sure to include group identifiers (e.g., "Group A" for
            Bible Bowl) and reference the Handbook for entry limits and other rules/qualifications.
          </p>
        )}
      </div>

      <div className="container">
        {!schoolData ? (
          <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
        ) : !isComplete ? (
          <>
            <StudentRegistrationForm onSubmit={handleStudentSubmit} />
            <div>
              <h2>Registered Students:</h2>
              <ul>
                {students.map((student, index) => (
                  <li key={index}>
                    {student.studentName} - {student.studentAge} years old (
                    {student.studentGender})
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleCompleteRegistration}>
              Complete Registration
            </button>
          </>
        ) : (
          <div>
            <h2>Registration Complete</h2>
            <p>School Name: {schoolData.schoolName}</p>
            <h3>Registered Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  {editingIndex === index ? (
                    <div>
                      <label>
                        Name:
                        <input
                          type="text"
                          value={students[index].studentName}
                          onChange={(e) =>
                            setStudents((prev) =>
                              prev.map((s, i) =>
                                i === index ? { ...s, studentName: e.target.value } : s
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Age:
                        <input
                          type="number"
                          value={students[index].studentAge}
                          onChange={(e) =>
                            setStudents((prev) =>
                              prev.map((s, i) =>
                                i === index ? { ...s, studentAge: e.target.value } : s
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Gender:
                        <select
                          value={students[index].studentGender}
                          onChange={(e) =>
                            setStudents((prev) =>
                              prev.map((s, i) =>
                                i === index ? { ...s, studentGender: e.target.value } : s
                              )
                            )
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </label>
                      <button onClick={handleSaveEdit}>Save</button>
                    </div>
                  ) : (
                    <p>
                      <strong>Name:</strong> {student.studentName} <br />
                      <strong>Age:</strong> {student.studentAge} <br />
                      <strong>Gender:</strong> {student.studentGender}
                      <div className="button-group">
                        <button onClick={() => setEditingIndex(index)}>Edit</button>
                        <button
                          onClick={() => console.log(`Add events for ${student.studentName}`)}
                        >
                          Add Events
                        </button>
                      </div>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
