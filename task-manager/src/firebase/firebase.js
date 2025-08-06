// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUAPqXcSakt-96ivzKYgyeHDaD2IfspCo",
    authDomain: "home-setup-planner.firebaseapp.com",
    projectId: "home-setup-planner",
    storageBucket: "home-setup-planner.firebasestorage.app",
    messagingSenderId: "148389939126",
    appId: "1:148389939126:web:fddf5827813ea974862317",
    measurementId: "G-4E0S000GQS"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.log("Browser does not support offline persistence.");
  }
});

export { db };
