import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Use EXPO_PUBLIC_ prefix so it works in both web & mobile
const firebaseConfig = {
 apiKey: "AIzaSyDL2G-AJJvwwbY_DOjDCLyES6QO8VpZh5Q",
  authDomain: "authnew-4468c.firebaseapp.com",
  projectId: "authnew-4468c",
  storageBucket: "authnew-4468c.firebasestorage.app",
  messagingSenderId: "352438752319",
  appId: "1:352438752319:web:1c67cf4ec974691020148a"
};

// 🔍 Debug log to confirm values are loaded

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
