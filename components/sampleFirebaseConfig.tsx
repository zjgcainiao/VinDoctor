// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "name_of_your_app.firebaseapp.com",
  projectId: "name_of_your_app",
  storageBucket: "name_of_your_app.appspot.com",
  messagingSenderId: "messaging_sender_id",
  appId: "app_id",
  measurementId: "measurement_id",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const firebase_analytics = getAnalytics(firebase_app);

// Initialize Firebase Authentication and get a reference to the service
const firebase_auth = getAuth(firebase_app);

export { firebase_app, firebase_analytics, firebase_auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
