import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventSelectionForm from './components/EventSelectionForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design", "Service Recap Video Presentation", "Graphic Design",
      "Persuasive Video", "Scripture Video", "Radio Program"
    ],
    "Academic Division (Performance)": [
      "Bible Memory Bee", "Academic Bowl", "Bible Bowl"
    ],
    "Academic Division (Non-Performance)": [
      "Checkers", "Chess", "Spelling", "Science Collection", "Science Research",
      "Science Engineering", "Science Theoretical", "Social Studies Research",
      "Social Studies Theoretical", "Social Studies Collection"
    ],
    "Needlecraft (Female)": [
      "Counted Cross-Stitch", "Embroidery", "Crochet", "Knitting", "Afghans",
      "Quilts", "Quilt Square"
    ],
    "Music Division (Performance)": [
      "Choir", "Male Solo", "Freestyle Male Solo", "Female Solo", "Freestyle Female Solo",
      "Male Duet", "Freestyle Male Duet", "Female Duet", "Freestyle Female Duet",
      "Mixed Duet", "Freestyle Mixed Duet", "Male Trio", "Freestyle Male Trio",
      "Female Trio", "Freestyle Female Trio", "Male Quartet", "Freestyle Male Quartet",
      "Female Quartet", "Freestyle Female Quartet", "Mixed Quartet", "Freestyle Mixed Quartet",
      "Small Ensemble", "Freestyle Small Ensemble", "Large Ensemble", "Freestyle Large Ensemble",
      "Male Solo Piano", "Female Solo Piano", "Freestyle Male Piano",
      "Freestyle Female Piano Solo", "Duet Piano", "Solo Woodwind",
      "Solo String Plucked", "Solo String Powered", "Solo Brass",
      "Solo Freestyle Guitar Male", "Solo Freestyle Guitar Female",
      "Duet Instrumental", "Trio Instrumental", "Quartet Instrumental",
      "Instrumental Ensemble", "Solo Miscellaneous"
    ],
    "Athletics (Male)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run",
      "1600 Meter Run", "400 Meter Relay", "1600 Meter Relay", "Soccer Kick",
      "Physical Fitness", "Table Tennis", "Basketball", "Long Jump",
      "Archery - Compound Bow", "Archery - Traditional Instinctive",
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    "Athletics (Female)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run",
      "1600 Meter Run", "400 Meter Relay", "1600 Meter Relay", "Soccer Kick",
      "Physical Fitness", "Table Tennis", "Volleyball",
      "Archery - Compound Bow", "Archery - Traditional Instinctive",
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    "Christian Service": [
      "Discipleship Award", "Christian Soldier Award", "Christian Worker Award",
      "Golden Apple Award", "Golden Lamb Award", "Golden Harp Award"
    ],
    "Creative Composition (Early Entries)": [
      "Essay Writing", "Poetry Writing", "Short Story Writing", "Play and Skit Writing"
    ],
    "Dramatic Arts Division (Performance)": [
      "Famous Speech", "Dramatic Monologue", "Expressive Recitation Male",
      "Expressive Recitation Female", "Poetry Recitation Male", "Poetry Recitation Female",
      "Dramatic Dialogue", "Clown Act", "Ventriloquism", "Skit", "Oratory",
      "Preaching (M) 13-15", "Preaching (M) 16-18", "Preaching (F) 13-15",
      "Preaching (F) 16-18", "Illustrated Storytelling Male",
      "Illustrated Storytelling Female", "Puppets", "Sign Language Team (5-10)",
      "Sign Language Team (11-20)", "One Act Play"
    ],
    "Art Division (Non-Performance)": [
      "Oil Painting", "Water Color", "Acrylics", "Sketching", "Pen and Ink",
      "Colored Pencils", "Oil Pastels", "Chalk Pastels", "Mixed Media", "Abstract",
      "Wood Construction", "Wood Turning", "Wood Carving", "Marquetry",
      "Metal Working", "Ceramics/Clay Sculpture", "Scrapbooking"
    ],
    "Photography Division (Non-Performance)": [
      "Mono Still Life", "Mono Wildlife", "Mono Scenic", "Mono Plants",
      "Color Scenic", "Color Still Life", "Color Plants", "Color Wildlife",
      "Color Special Effects", "Computer Photo Enhancement"
    ]
  };

  const handleSchoolSubmit = (school) => setSchoolData(school);
  const handleStudentSubmit = (student) => setStudents([...students, student]);
  const handleCompleteRegistration = () => setIsComplete(true);
  const handleStartEventSelection = (student) => setCurrentStudent(student);

  const handleEventSubmit = (studentName, selectedEventsForStudent) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [studentName]: selectedEventsForStudent,
    }));
    setCurrentStudent(null); // Exit event selection mode
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isComplete ? (
        <>
          <StudentRegistrationForm onSubmit={handleStudentSubmit} />
          <button className="complete-registration-centered" onClick={handleCompleteRegistration}>Complete Registration</button>
        </>
      ) : currentStudent ? (
        <EventSelectionForm
          student={currentStudent}
          availableEvents={availableEvents}
          onSubmit={handleEventSubmit}
        />
      ) : (
        <div className="container">
          <h2>Registration Complete</h2>
          <p>School Name: {schoolData.schoolName}</p>
          <h3>Registered Students:</h3>
          {students.map((student) => (
            <div key={student.studentName}>
              <p>
                <strong>Name:</strong> {student.studentName} <br />
                <strong>DOB:</strong> {student.studentDOB} <br />
                <strong>Gender:</strong> {student.studentGender} <br />
                <strong>Events:</strong>{" "}
                {selectedEvents[student.studentName]
                  ? selectedEvents[student.studentName]
                      .map((e) => `${e.eventName} (Group: ${e.group})`)
                      .join(", ")
                  : "None"}
              </p>
              <button onClick={() => handleStartEventSelection(student)}>
                Select Events
              </button>
            </div>
          ))}
          <button className="finalize-registration" onClick={() => alert('Registration finalized!')}>
            Finalize Registration
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
