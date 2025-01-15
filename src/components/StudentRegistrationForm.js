import React, { useState } from "react";

export default function StudentRegistrationForm({ onSubmit, onNextStep }) {
  const [studentName, setStudentName] = useState("");
  const [studentDOB, setStudentDOB] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [studentAge, setStudentAge] = useState("");
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setStudentDOB(dob);
    setStudentAge(calculateAge(dob));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { studentName, studentDOB, studentGender, studentAge };

    if (editingIndex !== null) {
      // Update an existing student
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = studentData;
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      // Add a new student
      setStudents([...students, studentData]);
    }

    // Clear the form fields
    setStudentName("");
    setStudentDOB("");
    setStudentGender("Male");
    setStudentAge("");
  };

  const handleEdit = (index) => {
    const student = students[index];
    setStudentName(student.studentName);
    setStudentDOB(student.studentDOB);
    setStudentGender(student.studentGender);
    setStudentAge(student.studentAge);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="container student-registration">
      <h2>Student Registration</h2>
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
          DOB:
          <input
            type="date"
            value={studentDOB}
            onChange={handleDOBChange}
            required
          />
        </label>
        {studentAge && <p><strong>Age:</strong> {studentAge}</p>}
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
        <div className="button-group">
          <button type="submit">
            {editingIndex !== null ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>

      <div className="registered-students">
        <h3>Registered Students</h3>
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="student-entry">
              <p>
                <strong>Name:</strong> {student.studentName} <br />
                <strong>DOB:</strong> {student.studentDOB} <br />
                <strong>Gender:</strong> {student.studentGender} <br />
                <strong>Age:</strong> {student.studentAge}
              </p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No students registered yet.</p>
        )}
      </div>

      {students.length > 0 && (
        <button className="next-step-button" onClick={onNextStep}>
          Next: Select Events
        </button>
      )}
    </div>
  );
}
