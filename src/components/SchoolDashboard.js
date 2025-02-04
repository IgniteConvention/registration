// SchoolDashboard.js
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { logoutUser } from "../auth";

const auth = getAuth();

function SchoolDashboard() {
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      const schoolRef = doc(db, "schools", auth.currentUser.uid);
      const schoolSnap = await getDoc(schoolRef);
      if (schoolSnap.exists()) setSchoolData(schoolSnap.data());
    };
    fetchSchool();
  }, []);

  const handleUpdate = async () => {
    await updateDoc(doc(db, "schools", auth.currentUser.uid), schoolData);
    alert("Updated successfully!");
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  return (
    <div>
      <h1>School Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
      {schoolData ? (
        <div>
          <input
            type="text"
            value={schoolData.schoolName}
            onChange={(e) => setSchoolData({ ...schoolData, schoolName: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SchoolDashboard;
