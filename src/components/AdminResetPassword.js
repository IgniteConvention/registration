import React, { useState } from "react";
import { resetUserPassword } from "../auth";

const AdminResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const result = await resetUserPassword(email);
    setMessage(result);
  };

  return (
    <div>
      <h2>Admin Password Reset</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter School Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminResetPassword;
