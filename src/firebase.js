// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-UD2e05X95bbLqyjcgX2vX1D5umlIqTk",
  authDomain: "auto-parts-project-kakoly.firebaseapp.com",
  projectId: "auto-parts-project-kakoly",
  storageBucket: "auto-parts-project-kakoly.firebasestorage.app",
  messagingSenderId: "90638776592",
  appId: "1:90638776592:web:065b04d5b8daa3f6260d95",
  measurementId: "G-TT6LX94Q13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };