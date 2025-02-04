import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getUserRole } from "./auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AdminDashboard from "./components/AdminDashboard";
import SchoolDashboard from "./components/SchoolDashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : role === "admin" ? <Navigate to="/admin-dashboard" /> : <Navigate to="/school-dashboard" />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/admin-dashboard" element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/school-dashboard" element={role === "school" ? <SchoolDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
