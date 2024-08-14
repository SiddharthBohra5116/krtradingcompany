// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFbA2CC0A-Cly57zqjwkAyZ3DjJMJloW0",
  authDomain: "krtradingcompany-6503e.firebaseapp.com",
  databaseURL: "https://krtradingcompany-6503e-default-rtdb.firebaseio.com",
  projectId: "krtradingcompany-6503e",
  storageBucket: "krtradingcompany-6503e.appspot.com",
  messagingSenderId: "655232497280",
  appId: "1:655232497280:web:390f6a49e57f08abbf5865",
  measurementId: "G-T0KGGM3BZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);