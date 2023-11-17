// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2nAbeM9CggQXJk1fLfg-f5feGd6_PfJc",
  authDomain: "vin-doctor.firebaseapp.com",
  projectId: "vin-doctor",
  storageBucket: "vin-doctor.appspot.com",
  messagingSenderId: "558945667327",
  appId: "1:558945667327:web:d299c0c60e2605b71ca4ca",
  measurementId: "G-M6BZ6B7DPJ",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const firebase_analytics = getAnalytics(firebase_app);

// Initialize Firebase Authentication and get a reference to the service
const firebase_auth = getAuth(firebase_app);

export { firebase_app, firebase_analytics, firebase_auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
