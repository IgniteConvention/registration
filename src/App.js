import React, { useState } from 'react';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import './App.css';

function App() {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  // Handle school registration submission
  const handleSchoolSubmit = (school) => {
    setSchoolData(school);
    console.log('School Data Submitted:', school);
  };

  // Handle student registration submission
  const handleStudentSubmit = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.studentName === editingStudent.studentName ? student : s
        )
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, student]);
    }
    console.log('Student Data Submitted:', student);
  };

  // Handle student edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  // Complete the registration process
  const handleCompleteRegistration = () => {
    setIsComplete(true);
  };

  return (
    <div className="App">
      <h1>Ignite Student Convention</h1>

      {!schoolData ? (
        // Show school reg
