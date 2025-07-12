// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkXicYPSclATZAESk-Op0LGoHmS6YwyWM",
  authDomain: "hotstargpt-1a6a3.firebaseapp.com",
  projectId: "hotstargpt-1a6a3",
  storageBucket: "hotstargpt-1a6a3.firebasestorage.app",
  messagingSenderId: "385409091522",
  appId: "1:385409091522:web:91666e6115e8b1b10fb85b",
  measurementId: "G-CNCVR1L8D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();