import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import EventRegistrationForm from './components/EventRegistrationForm';
import './App.css';  // Import the CSS file

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState({});

  // List of available events (from the event list)
  const availableEvents = {
    "Digital Media (Early Entry)": [
      "Website Design", "Service Recap Video Presentation", "Graphic Design", "Persuasive Video", 
      "Scripture Video", "Radio Program"
    ],
    "Academic Division (Performance)": [
      "Bible Memory Bee", "Academic Bowl", "Bible Bowl"
    ],
    "Athletics (Male)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run", "1600 Meter Run", 
      "400 Meter Relay", "1600 Meter Relay", "Soccer Kick", "Physical Fitness", "Table Tennis", "Basketball", 
      "Long Jump", "Archery - Compound Bow", "Archery - Traditional Instinctive", 
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    "Athletics (Female)": [
      "100 Meter Dash", "200 Meter Dash", "400 Meter Dash", "800 Meter Run", "1600 Meter Run", 
      "400 Meter Relay", "1600 Meter Relay", "Soccer Kick", "Physical Fitness", "Table Tennis", "Volleyball", 
      "Archery - Compound Bow", "Archery - Traditional Instinctive", 
      "Archery - Limited Freestyle", "Archery - Unlimited Freestyle"
    ],
    // Add the rest of the categories and events as needed...
