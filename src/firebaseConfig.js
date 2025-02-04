import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUnjhtcDnGdLsxgNMD5ZTrk4qstOuRwpM",
  authDomain: "igniteregistration.firebaseapp.com",
  projectId: "igniteregistration",
  storageBucket: "igniteregistration.appspot.com",
  messagingSenderId: "365150542866",
  appId: "1:365150542866:web:736202288ba4c7aaf70ccb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
