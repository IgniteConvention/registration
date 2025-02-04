import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, getUserRole } from "../auth";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [role, setRole] = useState("school"); // Default to School
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const user = await registerUser(email, password, role);

      // Store School Data in Firestore
      if (role === "school") {
        await setDoc(doc(db, "schools", email), {
          schoolName,
          email,
        });
      }

      // Automatically log in the user
      await loginUser(email, password);

      // Get user role & navigate to the correct dashboard
      const userRole = await getUserRole(user.uid);
      navigate(userRole === "admin" ? "/admin-dashboard" : "/school-dashboard");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="school">School</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
