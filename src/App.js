import React, { useState } from "react";
import SchoolRegistrationForm from "./components/SchoolRegistrationForm";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import StudentVerificationPage from "./components/StudentVerificationPage";
import EventSelectionForm from "./components/EventSelectionForm";
import "./App.css";

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [isStudentRegistrationComplete, setIsStudentRegistrationComplete] = useState(false);

  // Available Events
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

  const handleStudentEdit = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  const handleNextStep = () => {
    setIsStudentRegistrationComplete(true);
  };

  const handleFinalize = () => {
    alert("Finalized Registration");
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>
      {!schoolData ? (
        <SchoolRegistrationForm onSubmit={handleSchoolSubmit} />
      ) : !isStudentRegistrationComplete ? (
        <StudentRegistrationForm
          onSubmit={handleStudentSubmit}
          students={students}
          onNextStep={handleNextStep}
        />
      ) : (
        <StudentVerificationPage
          students={students}
          selectedEvents={availableEvents}
          onAddStudent={handleStudentSubmit}
          onEditStudent={handleStudentEdit}
          onAddEvents={() => {}}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  );
}

export default App;
