import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const auth = getAuth();

// Register a new user (School or Admin)
export const registerUser = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store user role in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email,
    role, // "admin" or "school"
  });

  return user;
};

// Login existing user
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout user
export const logoutUser = async () => {
  await signOut(auth);
};

// Get user role from Firestore
export const getUserRole = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data().role : null;
};

// Reset user password (for Admin use)
export const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("✅ Password reset email sent to:", email);
    return "Password reset email sent successfully!";
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    return "Failed to send password reset email.";
  }
};
