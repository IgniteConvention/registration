import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({});

  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design",
      "Service Recap Video Presentation",
      "Graphic Design",
      "Persuasive Video",
      "Scripture Video",
      "Radio Program"
    ],
    "Academic Division (Performance)": [
      "Bible Memory Bee",
      "Academic Bowl",
      "Bible Bowl"
    ],
    "Academic Division (Non-Performance)": [
      "Checkers",
      "Chess",
      "Spelling",
      "Science Collection",
      "Science Research",
      "Science Engineering",
      "Science Theoretical",
      "Social Studies Research",
      "Social Studies Theoretical",
      "Social Studies Collection"
    ],
    "Music Division (Performance)": [
      "Male Solo",
      "Female Solo",
      "Male Duet",
      "Female Duet",
      "Mixed Duet",
      "Male Trio",
      "Female Trio",
      "Mixed Trio",
      "Male Quartet",
      "Female Quartet",
      "Mixed Quartet",
      "Small Ensemble",
      "Large Ensemble",
      "Choir",
      "Male Piano Solo",
      "Female Piano Solo",
      "Duet Piano",
      "Instrumental Ensemble",
      "Solo Woodwind",
      "Solo Brass",
      "Solo String",
      "Freestyle Guitar (Male)",
      "Freestyle Guitar (Female)"
    ],
    "Dramatics Division (Performance)": [
      "Famous Speech",
      "Dramatic Monologue",
      "Expressive Recitation (Male)",
      "Expressive Recitation (Female)",
      "Poetry Recitation (Male)",
      "Poetry Recitation (Female)",
      "Dramatic Dialogue",
      "Clown Act",
      "Ventriloquism",
      "Skit",
      "Oratory",
      "Preaching (Male 13-15)",
      "Preaching (Male 16-18)",
      "Preaching (Female 13-15)",
      "Preaching (Female 16-18)",
      "Illustrated Storytelling (Male)",
      "Illustrated Storytelling (Female)",
      "Puppets",
      "Sign Language Team (5-10)",
      "Sign Language Team (11-20)",
      "One Act Play"
    ],
    "Art Division (Non-Performance)": [
      "Oil Painting",
      "Water Color",
      "Acrylics",
      "Sketching",
      "Pen and Ink",
      "Colored Pencils",
      "Oil Pastels",
      "Chalk Pastels",
      "Mixed Media",
      "Abstract",
      "Wood Construction",
      "Wood Turning",
      "Wood Carving",
      "Marquetry",
      "Metal Working",
      "Ceramics/Clay Sculpture",
      "Scrapbooking"
    ],
    "Photography Division (Non-Performance)": [
      "Mono Still Life",
      "Mono Wildlife",
      "Mono Scenic",
      "Mono Plants",
      "Color Scenic",
      "Color Still Life",
      "Color Plants",
      "Color Wildlife",
      "Color Special Effects",
      "Computer Photo Enhancement"
    ],
    "Athletics (Male)": [
      "100 Meter Dash",
      "200 Meter Dash",
      "400 Meter Dash",
      "800 Meter Run",
      "1600 Meter Run",
      "Soccer Kick",
      "Physical Fitness",
      "Archery - Compound Bow",
      "Long Jump",
      "400 Meter Relay",
      "1600 Meter Relay",
      "Basketball"
    ],
    "Athletics (Female)": [
      "100 Meter Dash",
      "200 Meter Dash",
      "400 Meter Dash",
      "800 Meter Run",
      "1600 Meter Run",
      "Soccer Kick",
      "Physical Fitness",
      "Archery - Traditional Instinctive",
      "Long Jump",
      "400 Meter Relay",
      "1600 Meter Relay",
      "Volleyball"
    ],
    "Christian Service Awards": [
      "Discipleship Award",
      "Christian Soldier Award",
      "Christian Worker Award",
      "Golden Apple Award",
      "Golden Lamb Award",
      "Golden Harp Award"
    ]
  };

  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
  };

  const handleStudentSubmit = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleNextStep = () => {
    if (students.length > 0) {
      setCurrentStudentIndex(0);
    } else {
      alert("Please register at least one student before proceeding.");
    }
  };

  const handleEventSubmit = (studentName, events) => {
    setSelectedEvents((prev) => ({ ...prev, [studentName]: events }));

    if (currentStudentIndex + 1 < students.length) {
      setCurrentStudentIndex((prev) => prev + 1);
    } else {
      setCurrentStudentIndex(null);
    }
  };

  const handleFinalize = () => {
    console.log("Finalizing Registration...");
    console.log("Students:", students);
    console.log("Selected Events:", selectedEvents);
    alert("Registration finalized successfully!");
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : currentStudentIndex === null ? (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          onNextStep={handleNextStep}
        />
      ) : currentStudentIndex < students.length ? (
        <EventSelectionForm
          student={students[currentStudentIndex]}
          availableEvents={availableEvents}
          existingSelections={
            selectedEvents[students[currentStudentIndex]?.studentName] || []
          }
          onSubmit={handleEventSubmit}
        />
      ) : (
        <div className="container finalize-registration">
          <h2>Review and Finalize</h2>
          <ul>
            {students.map((student) => (
              <li key={student.studentName}>
                <strong>{student.studentName}:</strong>{" "}
                {selectedEvents[student.studentName]?.join(", ") || "No events selected"}
              </li>
            ))}
          </ul>
          <button onClick={handleFinalize}>Finalize Registration</button>
        </div>
      )}
    </div>
  );
}

export default App;
