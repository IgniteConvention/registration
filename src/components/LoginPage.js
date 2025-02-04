import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      onLogin(user);
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={() => navigate("/register")}>Register</button></p>
    </div>
  );
};

export default LoginPage;
