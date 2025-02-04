import { useEffect, useState } from "react";
import { getUserRole } from "./auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import AdminDashboard from "./components/AdminDashboard";
import SchoolDashboard from "./components/SchoolDashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
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

  if (!user) {
    return isRegistering ? (
      <RegisterPage />
    ) : (
      <div>
        <LoginPage onLogin={setUser} />
        <button onClick={() => setIsRegistering(true)}>Register</button>
      </div>
    );
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "school") return <SchoolDashboard />;
  return <p>Loading...</p>;
}

export default App;
