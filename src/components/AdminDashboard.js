// AdminDashboard.js
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AdminResetPassword from "./AdminResetPassword";
import { logoutUser } from "../auth";

const AdminDashboard = () => {
  const [schools, setSchools] = useState([]);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      const snapshot = await getDocs(collection(db, "schools"));
      setSchools(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSchools();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
      <button onClick={() => setShowResetPassword(!showResetPassword)}>
        {showResetPassword ? "Close Reset Password" : "Reset School Password"}
      </button>
      {showResetPassword && <AdminResetPassword />}
      <h2>Registered Schools</h2>
      <ul>
        {schools.map(school => (
          <li key={school.id}>
            {school.schoolName} - {school.contactEmail}
            <button onClick={() => deleteDoc(doc(db, "schools", school.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
